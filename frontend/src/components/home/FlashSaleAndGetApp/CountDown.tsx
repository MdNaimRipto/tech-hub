import { useState, useEffect } from "react";

const CountDown = () => {
  const initialCountdown = (1 * 24 + 12) * 60 * 60; // 1 day and 12 hours in seconds
  const [timeLeft, setTimeLeft] = useState(initialCountdown);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Update the count down every 1 second
    const intervalId = setInterval(() => {
      // Decrease the time left by 1 second
      setTimeLeft(prevTime => prevTime - 1);

      // If the count down is finished, clear the interval and set as expired
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (isExpired) return <div className="font-bold">EXPIRED</div>;

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="mb-6">
      <div className="text-lg md:text-3xl flex font-semibold">
        <div className="flex flex-col items-center mr-6">
          <span className="text-red mr-2 mb-3">{days}</span>
          <span className="text-lg md:text-3xl text-black">days</span>
        </div>
        <div className="flex flex-col items-center mr-6">
          <span className="text-blue mr-2 mb-3">{hours}</span>
          <span className="text-lg md:text-3xl text-black">hours</span>
        </div>
        <div className="flex flex-col items-center mr-6">
          <span className="text-green mr-2 mb-3">{minutes}</span>
          <span className="text-lg md:text-3xl text-black">minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-pink mr-2 mb-3">{seconds}</span>
          <span className="text-lg md:text-3xl text-black">seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
