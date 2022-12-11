import React from "react";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";

import "./TaskList.scss";
type Task = {
  title: string;
  description: string;
  pomodoros: number;
  isComplete: boolean;
};

const TASKS: Task[] = [
  {
    title: "Do homework",
    description: "Math101 test due",
    pomodoros: 2,
    isComplete: false,
  },
  {
    title: "Write Essay",
    description:
      "1500 words to be written before Tuesday1500 words to be written before Tuesday1500 words to be written before Tuesday1500 words to be written before Tuesday1500 words to be written before Tuesday1500 words to be written before Tuesday1500 words to be written before Tuesday",
    pomodoros: 3,
    isComplete: true,
  },
  {
    title: "Cook Dinner",
    description: "roast lamb with veggies",
    pomodoros: 4,
    isComplete: false,
  },
  {
    title: "Cook Dinner",
    description: "roast lamb with veggies",
    pomodoros: 4,
    isComplete: false,
  },
  {
    title: "Cook Dinner",
    description: "roast lamb with veggies",
    pomodoros: 4,
    isComplete: false,
  },
  {
    title: "Cook DinnerCook DinnerCook Dinner",
    description: "roast lamb with veggies",
    pomodoros: 4,
    isComplete: true,
  },
];
const TaskList = () => {
  return (
    <div className="task-list">
      <h2>My Tasks</h2>
      <hr />
      <CreateTask />
      <ul>
        {TASKS.map((task, index) => (
          <TaskItem key={`${task.title}-${index}`} {...task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
