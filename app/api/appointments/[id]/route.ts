import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendNotificationToDoctor } from "@/lib/notification";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
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
