import React from "react";
import TaskItem from "./TaskItem";
const task = {
  title: "Cook DinnerCook DinnerCook Dinner",
  description: "roast lamb with veggies",
  pomodoros: 4,
  isComplete: true,
};

const CreateTask = () => {
  return (
    <div className="task-item">
      <div className="task-item__heading">
        <h2>Title</h2>
        <input className="title" type="text" />
      </div>
      <label>Description</label>
      <input className="description" type="text" />
      <label>Pomodoros:</label>
      <input className="pomodoros" type="text" />
    </div>
  );
};

export default CreateTask;
