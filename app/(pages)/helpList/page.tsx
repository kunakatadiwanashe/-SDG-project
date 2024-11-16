"use client";
import React, { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";

// Define types for Help Request
interface Donation {
    amount: number;
}

interface HelpRequest {
    id: string; // Assuming each help request has a unique ID
    message: string;
    createdAt: string;
    donations: Donation[]; // Ensure donations is always an array
}

const HelpRequestsList = () => {
    const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHelpRequests = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch('/api/help'); // Fetch help requests from the API
                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Error fetching help requests:', errorMessage); // Log error message
                    throw new Error(errorMessage || 'Failed to fetch help requests');
                }
                const data: HelpRequest[] = await response.json(); // Explicitly type the response
                console.log('Fetched help requests:', data); // Log the fetched data

                // Check if data is an array
                if (Array.isArray(data)) {
                    setHelpRequests(data); // Set the fetched data to state
                } else {
                    console.error('Expected an array but received:', data); // Log unexpected data structure
                    setError('Unexpected data format received.');
                }
            } catch (err) {
                console.error('Error occurred while fetching help requests:', err); // Log the error
                setError(err instanceof Error ? err.message : 'An unexpected error occurred.'); // Handle errors
            } finally {
                setLoading(false); 
            }
        };

        fetchHelpRequests(); 
    }, []);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>; 
    }

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-center mb-4">Help Requests</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Show error if exists */}
            {helpRequests.length === 0 ? (
                <div className="text-center text-gray-500">No help requests found.</div> // Show message if no requests
            ) : (
                <ul className="mt-4 space-y-4">
                    {helpRequests.map((request) => (
                        <li key={request.id} className="border-b border-gray-300 pb-4"> {/* Use unique ID as key */}
                            <p className="text-sm text-gray-500">{new Date(request.createdAt).toLocaleString()}</p>
                            <p className="text-lg font-medium">{request.message}</p> {/* Display message */}
                            <p className="text-md font-semibold">Total Donations: ${Array.isArray(request.donations) ? request.donations.reduce((sum, donation) => sum + donation.amount, 0) : 0}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HelpRequestsList;