
'use client';


import { useEffect, useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/nsw')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to fetch NSW data:', err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>NSW Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
