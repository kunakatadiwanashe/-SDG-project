import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { applyDocSchema } from "@/lib/zod";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    // Get the current session
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await req.json();
    
    // Validate the request body
    const validatedData = applyDocSchema.parse(body);

    // Create the doctor application
    const doctor = await prisma.doctor.create({
      data: {
        name: validatedData.name,
        lastName: validatedData.lastName,
        specialization: validatedData.specialization,
        experience: validatedData.experience,
        address: validatedData.address,
        email: session.user.email!, // Use the authenticated user's email
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error: any) {
    console.error("Error in doctor application:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}