// app/api/notifications/[userId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: Request, { params }: { params: { userId: string } }) {
    
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
