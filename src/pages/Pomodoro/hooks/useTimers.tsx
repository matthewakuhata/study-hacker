import { useEffect, useState } from "react";
const SECONDS_IN_MIN = 60;

export type PomodoroTimer = {
  name: string;
  seconds: number;
};

export type PomodoroTimersKeys = "pomodoro" | "short" | "long";

export type PomodoroTimers = {
  pomodoro: PomodoroTimer;
  short: PomodoroTimer;
  long: PomodoroTimer;
};

export type UpdateTimerValueFunction = (
  key: PomodoroTimersKeys,
  value: number
) => void;

export const initialTimersValue = {
  pomodoro: { name: "Pomodoro", seconds: 20 * SECONDS_IN_MIN },
  short: { name: "Short Break", seconds: 5 * SECONDS_IN_MIN },
  long: { name: "Long Break", seconds: 10 * SECONDS_IN_MIN },
};

export const useTimerValues = () => {
  const [timerValues, setTimerValues] =
    useState<PomodoroTimers>(initialTimersValue);

  const updateTimerValue: UpdateTimerValueFunction = (key, value) => {
    setTimerValues((prev) => {
      const newTimers = { ...prev };
      newTimers[key].seconds = value;

      localStorage.setItem("pomo-timers", JSON.stringify(timerValues));
      return newTimers;
    });
  };

  useEffect(() => {
    const timers = JSON.parse(localStorage.getItem("pomo-timers") || "[]");
    console.log(!timers);
    if (!!timers) {
      setTimerValues(initialTimersValue);
    } else {
      setTimerValues(timers);
    }
  }, []);

  return { timerValues, updateTimerValue };
};
