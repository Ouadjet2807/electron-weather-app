import React, { useEffect, useState } from "react";

export default function CurrentTime({outline}) {
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString().slice(0, 10));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h3 className={`${outline ? "time-outline" : "time"}`}>{currentTime}</h3>
    </>
  );
}
