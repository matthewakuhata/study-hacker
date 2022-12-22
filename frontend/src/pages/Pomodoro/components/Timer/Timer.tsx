import React, { useContext, useEffect, useState } from "react";

import { convertToDisplayTime } from "../../../../helpers/convertToDisplayTime";
import { Button } from "../../../../shared/components/Form";
import { useInterval } from "../../../../shared/hooks/useInterval";
import { PomodoroTimersKeys, TimersContext } from "../../contexts/timers";

import "./styles.scss";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const {
    timerValues,
    isActive,
    timerSelected,
    setElapsedTime,
    toggleIsActive,
    setTimerSelected,
  } = useContext(TimersContext);

  // maybe unneeded just make user refresh page
  useEffect(() => {
    if (isActive) return;
    setSeconds(timerValues?.[timerSelected].seconds || 0);

    //eslint-disable-next-line
  }, [timerValues]);

  const updateRemainingTime = () => {
    setSeconds((prev) => prev - 1);
    setElapsedTime((prev) => prev + 1);

    if (seconds <= 0) {
      toggleIsActive();
    }
  };

  useInterval(updateRemainingTime, isActive ? 1000 : null);

  const resetTimer = () => {
    const timerDuration = timerValues[timerSelected].seconds;
    setSeconds(timerDuration);
    setElapsedTime(0);
  };

  const selectTimer = (type: PomodoroTimersKeys) => {
    if (isActive) {
      const continueChange = window.confirm(
        `This will stop the timer${
          timerSelected === "pomodoro" ? " and no time will be log.\n" : ". "
        }Do you want to continue?`
      );

      if (!continueChange) return;
    }
    toggleIsActive(false);
    setTimerSelected(type);
    setElapsedTime(0);
    setSeconds(timerValues[type].seconds);
  };

  return (
    <section className="pomodoro__container">
      <div className="timer__selection">
        {timerValues &&
          Object.keys(timerValues).map((key) => {
            return (
              <Button
                key={key}
                onClick={() => selectTimer(key as PomodoroTimersKeys)}
                isSelected={timerSelected === key}
                displaySize="s"
              >
                {timerValues[key as PomodoroTimersKeys].name}
              </Button>
            );
          })}
      </div>
      <span className="timerDuration" data-testid="timer">
        {convertToDisplayTime(seconds)}
      </span>
      <div className="timer__controls">
        {isActive ? (
          <Button displayType="red" onClick={() => toggleIsActive()}>
            Stop
          </Button>
        ) : (
          <>
            {seconds > 0 ? (
              <Button onClick={() => toggleIsActive()}>Start</Button>
            ) : (
              <Button onClick={() => selectTimer("short")}>Next</Button>
            )}
            {timerValues && timerValues[timerSelected].seconds !== seconds && (
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
