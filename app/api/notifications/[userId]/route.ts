// app/api/notifications/[userId]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import path as necessary

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Await the params before destructuring
    const { userId } = await params;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      // include any other options you need
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}