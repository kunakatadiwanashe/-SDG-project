"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession from next-auth

const HelpRequestForm = () => {
    const { data: session } = useSession(); // Get session data
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true); // Set loading to true when starting the request

        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            setError("Please enter a message.");
            setLoading(false); // Reset loading state
            return;
        }

        if (!session || !session.user) {
            setError("You must be signed in to submit a help request.");
            setLoading(false); // Reset loading state
            return;
        }

        try {
            const response = await fetch('/api/help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: trimmedMessage, 
                    userId: session.user.id, // Include user ID from session
                    userName: session.user.name // Include user name from session
                }),
            });

            // Log the response for debugging
            console.log('Response Status:', response.status);
            const responseData = await response.json();
            console.log('Response Data:', responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to send help request');
            }

            setSuccess(true);
            setMessage('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center">Request Help</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">Help request sent successfully!</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="helpMessage" className="block mb-2 text-sm font-medium">Describe your issue:</label>
                <textarea
                    id="helpMessage"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue"
                    required
                    className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    disabled={loading} // Disable button while loading
                    className={`w-full mt-4 py-2 rounded-md transition duration-200 ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {loading ? 'Sending...' : 'Send Request'} {/* Change button text based on loading state */}
                </button>
            </form>
        </div>
    );
};

export default HelpRequestForm;