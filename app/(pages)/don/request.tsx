// app/(pages)/donation/requests.tsx
import prisma from "@/lib/prisma";

export default async function DonationRequestsPage() {
    const donations = await prisma.donation.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Donations</h1>
            <ul className="space-y-4">
                {donations.map((donation) => (
                    <li key={donation.id} className="border p-4 rounded">
                        <p>Amount: ${donation.amount}</p>
                        <p className="text-gray-500 text-sm">
                            Donated on: {new Date(donation.createdAt).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}