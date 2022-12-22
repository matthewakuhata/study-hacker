export type Task = {
  title: string;
  description: string;
  pomodoros: number;
  isComplete: boolean;
  loggedTime: number;
  id: string;
  status: TaskStatus;
};

export enum TaskStatus {
  OPEN = "OPEN",
  COMPLETE = "COMPLETE",
}

export type CreateTaskFunction = ({
  title,
  description,
  pomodoros,
}: {
  title: string;
  description?: string;
  pomodoros: number;
}) => void;

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
