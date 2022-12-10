import React, { useContext, useState } from "react";
import { AppContext } from "../../../../App";
import { convertToDisplayTime } from "../../../../helpers/convertToDisplayTime";

import { Button } from "../../../../shared/components/Form";
import { useInterval } from "../../../../shared/hooks/useInterval";
import { PomodoroTimers, PomodoroTimersKeys } from "../../hooks/useTimers";

import "./styles.scss";

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [timerSelected, setTimerSelected] =
    useState<PomodoroTimersKeys>("pomodoro");

  const { timerValues } = useContext(AppContext);
  const [seconds, setSeconds] = useState<number>(timerValues.pomodoro.seconds);

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
    const timerDuration = timerValues[timerSelected].seconds;
    setSeconds(timerDuration);
  };

  const selectTimer = (type: PomodoroTimersKeys) => {
    setTimerSelected(type);
    setIsActive(false);
    setSeconds(timerValues[type].seconds);
  };

  return (
    <section className="pomodoro__container">
      <div className="timer__selection">
        {Object.keys(timerValues).map((key) => {
          return (
            <Button
              key={key}
              onClick={() => selectTimer(key as PomodoroTimersKeys)}
              isSelected={timerSelected === key}
              size="s"
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
          <Button displayType="red" onClick={toggleIsActive}>
            Stop
          </Button>
        ) : (
          <>
            {seconds > 0 ? (
              <Button onClick={toggleIsActive}>Start</Button>
            ) : (
              <Button onClick={() => selectTimer("short")}>Next</Button>
            )}
            {timerValues[timerSelected].seconds !== seconds && (
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
