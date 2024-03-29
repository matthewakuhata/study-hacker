import { createContext, useContext, useEffect, useState } from "react";
import {
  PomodoroTimers,
  PomodoroTimersKeys,
  UpdateTimerValueFunction,
} from "../types";
const SECONDS_IN_MIN = 60;

export const initialTimersValue = {
  pomodoro: { name: "Pomodoro", seconds: 20 * SECONDS_IN_MIN },
  short: { name: "Short Break", seconds: 5 * SECONDS_IN_MIN },
  long: { name: "Long Break", seconds: 10 * SECONDS_IN_MIN },
};

interface TimersContextArgs {
  timerValues: PomodoroTimers;
  isActive: boolean;
  elapsedTime: number;
  updateTimerValue: UpdateTimerValueFunction;
  toggleIsActive: (value?: boolean) => void;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
  timerSelected: PomodoroTimersKeys;
  setTimerSelected: React.Dispatch<React.SetStateAction<PomodoroTimersKeys>>;
}

export const TimersContext = createContext<TimersContextArgs>({
  timerValues: initialTimersValue,
  isActive: false,
  elapsedTime: 0,
  timerSelected: "pomodoro",
  updateTimerValue: () => {},
  toggleIsActive: (_) => {},
  setElapsedTime: () => {},
  setTimerSelected: () => {},
});

export const useTimers = () => {
  const contextValue = useContext(TimersContext);

  if (!contextValue) {
    throw new Error("useTimers must be called from within an TimersProvider");
  }

  return contextValue;
};

export const TimersProvider = (props: any) => {
  const [timerValues, setTimerValues] = useState<PomodoroTimers | null>();
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerSelected, setTimerSelected] =
    useState<PomodoroTimersKeys>("pomodoro");

  const updateTimerValue: UpdateTimerValueFunction = (key, value) => {
    setTimerValues((prev) => {
      if (!prev) return prev;

      const newTimers = { ...prev };
      newTimers[key].seconds = value;

      localStorage.setItem("pomo-timers", JSON.stringify(timerValues));
      return newTimers;
    });
  };

  const toggleIsActive = (value?: boolean) => {
    if (value != null) {
      setIsActive(value);
    } else {
      setIsActive((prev) => !prev);
    }
  };

  useEffect(() => {
    const timers = JSON.parse(localStorage.getItem("pomo-timers") || "[]");
    if (!timers) {
      setTimerValues(initialTimersValue);
    } else {
      setTimerValues(timers);
    }
  }, []);

  return (
    <TimersContext.Provider
      value={{
        timerValues,
        isActive,
        elapsedTime,
        setElapsedTime,
        toggleIsActive,
        updateTimerValue,
        timerSelected,
        setTimerSelected,
      }}
      {...props}
    />
  );
};
