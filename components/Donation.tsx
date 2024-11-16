
export default function DonationPage() {
    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Make a Donation</h1>
            <p>Your contributions help us provide essential services. Thank you for your support!</p>
            <form action="/api/donate" method="POST" className="space-y-4">
                <input
                    type="number"
                    name="amount"
                    placeholder="Donation Amount"
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Donate
                </button>
            </form>
        </div>
    );
}