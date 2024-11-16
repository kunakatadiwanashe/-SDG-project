


import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure you have prisma imported

export async function POST(req: Request) {
    const { message } = await req.json();

    try {
        // Save the help request to the database
        const helpRequest = await prisma.helpRequest.create({
            data: {
                message,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, data: helpRequest });
    } catch (error) {
        console.error("Error saving help request:", error);
        return NextResponse.json({ success: false, error: "Failed to save help request" }, { status: 500 });
    }
}



export async function GET() {
    try {
        const helpRequests = await prisma.helpRequest.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(helpRequests);
    } catch (error) {
        console.error("Error fetching help requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch help requests" },
            { status: 500 }
        );
    }
}