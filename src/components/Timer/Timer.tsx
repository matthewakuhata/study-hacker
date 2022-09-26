import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    let tick: NodeJS.Timer;
    if (isActive) {
      tick = setInterval(() => {
        updateRemainingTime();
      }, 1000);
    }
    return () => {
      clearInterval(tick);
    };
  });

  const updateRemainingTime = () => {
    setSeconds((prev) => prev - 1);

    if (seconds <= 0) {
      toggleIsActive();
    }
  };

  const toggleIsActive = () => {
    setIsActive(!isActive);
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

  const showReset = () => {
    return timers[timerSelected].seconds !== seconds;
  };

  const getClassNames = (type: number) => {
    if (timerSelected === type) return "button--selected";
    return "button";
  };

  const getStyles = (type: string) => {
    let bgColor = "255, 255, 255";

    switch (type) {
      case "green": {
        bgColor = "0, 102, 0";
        break;
      }
      case "red": {
        bgColor = "204, 0, 0";
        break;
      }
    }

    return {
      "--bg-color": `rgba(${bgColor}, 0.2)`,
      "--bg-color-hover": `rgba(${bgColor}, 0.5)`,
    } as React.CSSProperties;
  };

  return (
    <section className="pomodoro__container">
      <div className="timerSelection">
        {timers.map((timer, index) => {
          return (
            <span
              key={timer.key}
              onClick={() => selectTimer(index)}
              className={getClassNames(index)}
              style={getStyles("default")}
            >
              {timer.name}
            </span>
          );
        })}
      </div>
      <span className="timerDuration" data-testid="timer">
        {calculateDisplayTime(seconds)}
      </span>
      <div className="timerControls">
        {isActive ? (
          <span
            style={getStyles("red")}
            onClick={toggleIsActive}
            className="button timerControls__button"
          >
            Stop
          </span>
        ) : (
          <>
            {seconds > 0 ? (
              <span
                style={getStyles("default")}
                onClick={toggleIsActive}
                className="button timerControls__button"
              >
                Start
              </span>
            ) : (
              <span
                style={getStyles("default")}
                onClick={() => selectTimer((timerSelected + 1) % 3)}
                className="button timerControls__button"
              >
                Next
              </span>
            )}
            {showReset() && (
              <span
                style={getStyles("red")}
                onClick={resetTimer}
                className="button timerControls__button"
              >
                Reset
              </span>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Timer;
