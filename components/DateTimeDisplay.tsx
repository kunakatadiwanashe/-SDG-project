"use client";

import { useEffect, useState } from "react";

export default function DateTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer); 
  }, []);


  const day = currentTime.getDate();
  const month = currentTime
    .toLocaleString("en-US", { month: "short" })
    .toLowerCase();
  const weekday = currentTime.toLocaleString("en-US", { weekday: "long" });

  return (
    <>
        {day} {month} {weekday}
    </>
  );
}
