import React, { useState, useEffect } from "react";
import "./countdown.css";

const COUNTDOWN_TARGET = new Date("2024-04-04T23:59:59");

const getTimeLeft = () => {
  const totalTimeLeft = COUNTDOWN_TARGET - new Date();
  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((totalTimeLeft / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft();
      // Check if seconds or minutes have changed
      if (newTimeLeft.seconds !== timeLeft.seconds) {
        setTimeLeft(newTimeLeft);
      } else if (newTimeLeft.minutes !== timeLeft.minutes) {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div className="countdown">
      <h2>COUNTDOWN</h2>
      <div className="content">
        <div className="box">
          <div className="value">
            <span>{timeLeft.days}</span>
          </div>
          <span className="label">Days</span>
        </div>
        <div className="box">
          <div className="value">
            <span>{timeLeft.hours}</span>
          </div>
          <span className="label">Hours</span>
        </div>
        <div className="box flip-horizontal">
          <div className="value">
            <span>{timeLeft.minutes}</span>
          </div>
          <span className="label">Minutes</span>
        </div>
        <div className="box flip-horizontal">
          <div className="value">
            <span>{timeLeft.seconds}</span>
          </div>
          <span className="label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
