import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendNotificationToUser } from "@/lib/notification"; // You'll need to create this function

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

        // Send notification to user
        await sendNotificationToUser(appointment.userId, `Your appointment has been ${status}`);

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