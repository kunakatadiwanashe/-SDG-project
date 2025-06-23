

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.onegov.nsw.gov.au/certifier/v1', {
      headers: {
        'Authorization': `apikey ${process.env.NSW_API_KEY}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching NSW API' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('API call failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
