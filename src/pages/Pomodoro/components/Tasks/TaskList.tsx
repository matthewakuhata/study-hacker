import React, { useState } from "react";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./TaskList.scss";
export type Task = {
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
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <div className="task-list">
      <h2>My Tasks</h2>
      <hr />
      <ul>
        {TASKS.sort((a, b) => (a.isComplete ? 1 : -1)).map((task, index) => (
          <TaskItem key={`${task.title}-${index}`} {...task} />
        ))}

        {showAddTask ? (
          <CreateTask closeHandler={() => setShowAddTask(false)} />
        ) : (
          <div
            onClick={() => setShowAddTask(true)}
            className="task-list__add-task"
          >
            <AddCircleOutlineIcon />
            Add Task
          </div>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
