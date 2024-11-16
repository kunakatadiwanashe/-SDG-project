"use client"
import { useEffect, useState } from 'react';

export default function DonationPage() {
  const [helpRequests, setHelpRequests] = useState([]);
  const [selectedHelpRequestId, setSelectedHelpRequestId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHelpRequests = async () => {
      const response = await fetch('/api/help'); // Fetch help requests
      const data = await response.json();
      setHelpRequests(data);
    };

    fetchHelpRequests();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);
    setError(''); // Reset error message
    const amount = event.target.amount.value; // Ensure this is a number
    const helpRequestId = selectedHelpRequestId; // Ensure this is set correctly

    try {
      const response = await fetch('/api/donate', { // Change endpoint to /api/donate
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            amount: Number(amount), 
            helpRequestId: helpRequestId,
          }),
      });

      // Log the response for debugging
      console.log('Response Status:', response.status);
      const responseData = await response.json();
      console.log('Response Data:', responseData);

      if (!response.ok) {
          throw new Error(responseData.error || 'Failed to send donation');
      }

      setSuccess(true);
      // Optionally, reset the form or selectedHelpRequestId here
      setSelectedHelpRequestId(''); // Reset selection after successful donation
      event.target.reset(); // Reset form fields

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Make a Donation</h1>
      {success && <p className="text-green-500">Donation successful!</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <input 
          type="number" 
          name="amount" 
          placeholder="Donation Amount" 
          required 
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />
        
        <select 
          onChange={(e) => setSelectedHelpRequestId(e.target.value)} 
          required 
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        >
          <option value="">Select Help Request</option>
          {helpRequests.map((request) => (
            <option key={request.id} value={request.id}>
              {request.message}
            </option>
          ))}
        </select>

        <button 
          type="submit" 
          className="bg-blue-500 text-white font-bold py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
        >
          Donate
        </button>
      </form>
    </div>
  );
}