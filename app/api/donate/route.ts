import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { amount, helpRequestId } = await req.json();

    // Validate input
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ success: false, error: "Invalid donation amount" }, { status: 400 });
    }
    
    if (!helpRequestId) {
      return NextResponse.json({ success: false, error: "Help request ID is required" }, { status: 400 });
    }

    // Save the donation to the database
    const donation = await prisma.donation.create({
      data: {
        amount,
        helpRequestId, 
        createdAt: new Date(),
      },
    });



    

    return NextResponse.json({ success: true, data: donation });
  } catch (error) {
    console.error("Error saving donation:", error);
    return NextResponse.json({ success: false, error: "Failed to save donation" }, { status: 500 });
  }
}