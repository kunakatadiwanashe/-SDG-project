import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendNotificationToDoctor } from "@/lib/notification";


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { status } = body;

        if (status !== "approved" && status !== "declined") {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        const appointment = await prisma.appointment.update({
            where: { id: params.id },
            data: { status },
        });

        // Send notification to doctor
        await sendNotificationToDoctor(appointment.userId, `Your appointment has been ${status}`);

        return NextResponse.json({ success: true, data: appointment });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || "Something went wrong" 
            },
            { status: 400 }
        );
    }
}


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the appointment by id
    const appointment = await prisma.appointment.findUnique({
        where: { id: params.id },
    });

    if (!appointment) {
        return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Optionally, check if the user is allowed to view this appointment
    if (appointment.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ id, message: 'Appointment fetched successfully' });
}
