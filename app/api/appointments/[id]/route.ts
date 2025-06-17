import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendNotificationToDoctor } from "@/lib/notification"; // Changed to existing function
import type { NextApiRequest, NextApiResponse } from 'next';

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






export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    res.status(200).json({ appointments: [] }); // Replace with real data
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const session = await auth();

  if (!session?.user || session.user.id !== params.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


}
