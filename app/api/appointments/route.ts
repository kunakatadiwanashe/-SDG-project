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





export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const session = await auth();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }
if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 });
  }

const appointments = await prisma.appointment.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
  });



  return Response.json({ appointments });


}
