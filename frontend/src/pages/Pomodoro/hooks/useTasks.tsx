import { useEffect, useState } from "react";

export type Task = {
  title: string;
  description: string;
  pomodoros: number;
  isComplete: boolean;
  loggedTime: number;
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

// TODO: Clean up create update and delete functions
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const res = localStorage.getItem("pomo-tasks") || "[]";
    const data = JSON.parse(res) as Task[];

    setTasks(data.sort((a, b) => (a.isComplete ? 1 : b.isComplete ? -1 : 1)));
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
      loggedTime: 0,
      id: Date.now().toString(),
    };

    setTasks((prev) => {
      const data = [...prev, newTask];
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

  const updateTask = (newTask: Partial<Task>, id: string) => {
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
      newData[indexOf] = {
        ...newData[indexOf],
        ...newTask,
      };

      localStorage.setItem("pomo-tasks", JSON.stringify(newData));
      return newData;
    });
  };

  const reorderTasks = (source: number, destination: number) => {
    setTasks((prevTasks) => {
      const reorderedTask = [...prevTasks];
      const [reorderedItem] = reorderedTask.splice(source, 1);
      reorderedTask.splice(destination, 0, reorderedItem);

      localStorage.setItem("pomo-tasks", JSON.stringify(reorderedTask));
      return reorderedTask;
    });
  };

  return { tasks, reorderTasks, deleteTask, updateTask, createTask };
};
