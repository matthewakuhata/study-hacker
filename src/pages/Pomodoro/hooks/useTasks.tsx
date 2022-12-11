import { useEffect, useState } from "react";

export type Task = {
  title: string;
  description: string;
  pomodoros: number;
  isComplete: boolean;
  id: string;
};

export type CreateTaskFunction = ({
  title,
  description,
  pomodoros,
}: {
  title: string;
  description?: string;
  pomodoros: number;
}) => void;

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const res = localStorage.getItem("pomo-tasks") || "[]";
    const data = JSON.parse(res);

    setTasks(data);
  }, []);

  const createTask: CreateTaskFunction = ({
    title,
    description,
    pomodoros,
  }) => {
    //TODO: Validation
    const newTask = {
      title,
      description: description || "",
      pomodoros,
      isComplete: false,
      id: Date.now().toString(),
    };

    setTasks((prev) => {
      const data = [newTask, ...prev];
      localStorage.setItem("pomo-tasks", JSON.stringify(data));

      return data;
    });

    // return newTask;
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      let indexOf = -1;
      prev.filter((task, index) => {
        if (task.id === id) {
          indexOf = index;
          return true;
        }

        return false;
      });
      if (indexOf < 0) return prev;

      const newData = [...prev];
      newData.splice(indexOf, 1);

      localStorage.setItem("pomo-tasks", JSON.stringify(newData));
      return newData;
    });
  };

  const updateTask = (task: Task, id: string) => {
    setAndSaveTasks(task, id);
  };

  const setAndSaveTasks = (newTask: Task, id?: string) => {
    setTasks((prev) => {
      let indexOf = -1;
      prev.filter((task, index) => {
        if (task.id === id) {
          indexOf = index;
          return true;
        }

        return false;
      });
      if (indexOf < 0) return prev;

      const newData = [...prev];
      newData[indexOf] = newTask;

      localStorage.setItem("pomo-tasks", JSON.stringify(newData));
      return newData;
    });
  };

  return { tasks, deleteTask, updateTask, createTask };
};
