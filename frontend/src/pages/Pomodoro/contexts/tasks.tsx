import { createContext, useContext, useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import {
  CreateTaskFunction,
  PomodoroTimers,
  PomodoroTimersKeys,
  Task,
  UpdateTimerValueFunction,
} from "../types";

interface TaskContextArgs {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (task: Partial<Task>, id: string) => void;
  reorderTasks: (source: number, destination: number) => void;
  createTask: CreateTaskFunction;
}

export const TaskContext = createContext<TaskContextArgs>({
  tasks: [],
  deleteTask: () => {},
  updateTask: () => {},
  createTask: () => {},
  reorderTasks: () => {},
});

export const useTimers = () => {
  const contextValue = useContext(TaskContext);

  if (!contextValue) {
    throw new Error("useTimers must be called from within an TasksProvider");
  }

  return contextValue;
};

export const TasksProvider = (props: any) => {
  const { tasks, reorderTasks, deleteTask, updateTask, createTask } =
    useTasks();

  return (
    <TaskContext.Provider
      value={{ tasks, reorderTasks, deleteTask, updateTask, createTask }}
      {...props}
    />
  );
};
