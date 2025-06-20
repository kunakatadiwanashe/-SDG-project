import prisma from "./prisma";

export async function sendNotificationToDoctor(doctorId: string, message: string) {
    try {
        const notification = await prisma.notification.create({
            data: {
                userId: doctorId,
                message,
                type: "APPOINTMENT_REQUEST",
                read: false,
            },
        });
        

        return notification;
    } catch (error) {
        console.error("Error sending notification to doctor:", error);
        throw new Error("Failed to send notification to doctor");
    }
}

