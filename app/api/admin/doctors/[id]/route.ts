// app/api/admin/doctors/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    const updatedDoctor = await prisma.doctor.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}