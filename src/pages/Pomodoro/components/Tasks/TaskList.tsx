import React from "react";

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
    description: "1500 words to be written before Tuesday",
    pomodoros: 3,
    isComplete: true,
  },
  {
    title: "Cook Dinner",
    description: "roast lamb with veggies",
    pomodoros: 4,
    isComplete: false,
  },
];
const TaskList = () => {
  return (
    <div className="pomodoro__container">
      <h2>TaskList +</h2>
      <div>Add Task</div>
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
  );
};

export default TaskList;
