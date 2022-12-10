import React, { useEffect, useState } from "react";
import { Button } from "../../../../shared/components/Form";
import { useInterval } from "../../../../shared/hooks/useInterval";
import "./styles.scss";

const Timer = ({ timerValues = [3, 4, 5] }: { timerValues: number[] }) => {
  const timers = [
    { key: "pomodoro", name: "Pomodoro", seconds: timerValues[0] },
    { key: "short", name: "Short Break", seconds: timerValues[1] },
    { key: "long", name: "Long Break", seconds: timerValues[2] },
  ];

  const [isActive, setIsActive] = useState(false);
  const [timerSelected, setTimerSelected] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(timers[0].seconds);

  const updateRemainingTime = () => {
    setSeconds((prev) => prev - 1);

    if (seconds <= 0) {
      toggleIsActive();
    }
  };

  useInterval(updateRemainingTime, isActive ? 1000 : null);

  const toggleIsActive = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    const timerDuration = timers[timerSelected].seconds;
    setSeconds(timerDuration);
  };

  const calculateDisplayTime = (seconds: number) => {
    if (seconds <= 0) {
      return "00:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    const minsDisplay = mins >= 10 ? mins.toString(10) : `0${mins}`;
    const secsDisplay = secs >= 10 ? secs.toString(10) : `0${secs}`;
    return `${minsDisplay}:${secsDisplay}`;
  };

  const selectTimer = (type: number) => {
    setTimerSelected(type);
    setSeconds(timers[type].seconds);
  };

  return (
    <section className="pomodoro__container">
      <div className="timer__selection">
        {timers.map((timer, index) => {
          return (
            <Button
              key={timer.key}
              onClick={() => selectTimer(index)}
              isSelected={timerSelected === index}
              size="s"
            >
              {timer.name}
            </Button>
          );
        })}
      </div>
      <span className="timerDuration" data-testid="timer">
        {calculateDisplayTime(seconds)}
      </span>
      <div className="timer__controls">
        {isActive ? (
          <Button displayType="red" onClick={toggleIsActive}>
            Stop
          </Button>
        ) : (
          <>
            {seconds > 0 ? (
              <Button onClick={toggleIsActive}>Start</Button>
            ) : (
              <Button onClick={() => selectTimer((timerSelected + 1) % 3)}>
                Next
              </Button>
            )}
            {timers[timerSelected].seconds !== seconds && (
              <Button displayType="red" onClick={resetTimer}>
                Reset
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Timer;
