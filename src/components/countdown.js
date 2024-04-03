import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { intervalToDuration, addSeconds, differenceInMilliseconds } from 'date-fns'; // Import necessary functions

import Card from './card';
import './countdown.css';

const Countdown = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const targetDate = new Date('2024-04-05T00:00:00'); // April 5, 2024, 12:00 AM

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(time => addSeconds(time, 1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const difference = differenceInMilliseconds(targetDate, currentTime);
  const { days, hours, minutes, seconds } = intervalToDuration({ start: 0, end: difference });

  return (
    <div className="container-countdown">
      <div className="global-style" />
      <h2 className='heading-countdown'>COUNTDOWN</h2>
      <div className="main">
        <Card currentNumber={hours} nextNumber={hours - 1} title="hours" />
        <Card currentNumber={minutes} nextNumber={minutes - 1} title="minutes" />
        <Card currentNumber={seconds} nextNumber={seconds - 1} title="seconds" />
      </div>
    </div>
  );
};

export default Countdown;
