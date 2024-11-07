import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

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

        // Create appointment
        const appointment = await prisma.appointment.create({
            data: {
                userId: session.user.id,
                doctorId,
                date: new Date(date),
            },
        });

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