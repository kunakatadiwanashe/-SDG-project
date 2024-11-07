// app/api/doctor/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { applyDocSchema } from "@/lib/zod";
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
        const validatedData = applyDocSchema.parse(body);

        // Create doctor record
        const doctor = await prisma.doctor.create({
            data: {
                name: validatedData.name,
                lastName: validatedData.lastName,
                specialization: validatedData.specialization,
                experience: validatedData.experience,
                address: validatedData.address,
                email: session.user.email!,
                status: "pending", // Add this if not defaulting
            },
        });

        return NextResponse.json({ success: true, data: doctor });

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