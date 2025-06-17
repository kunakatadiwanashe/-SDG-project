import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendNotificationToDoctor } from "@/lib/notification";

export async function POST(req: Request) {
    try {
        const session = await auth();
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { doctorId, date } = body;

        // Validate required fields
        if (!doctorId || !date) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create appointment with pending status
        const appointment = await prisma.appointment.create({
            data: {
                userId: session.user.id,
                doctorId,
                date: new Date(date),
                status: "pending", // Add default status
            },
        });

        // Send notification to doctor
        try {
            await sendNotificationToDoctor(
                doctorId, 
                `New appointment request for ${new Date(date).toLocaleString()}`
            );
        } catch (notificationError) {
            console.error("Failed to send notification:", notificationError);
            // Continue even if notification fails
        }

        return NextResponse.json({ 
            success: true, 
            data: appointment 
        });

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




export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
    const { id } = context.params;
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the appointment by id
    const appointment = await prisma.appointment.findUnique({
        where: { id }, // fixed: use id directly
    });

    if (!appointment) {
        return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Optionally, check if the user is allowed to view this appointment
    if (appointment.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Return the full appointment data
    return NextResponse.json({ success: true, data: appointment });
}



