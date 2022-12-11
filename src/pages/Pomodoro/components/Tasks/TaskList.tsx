import { createContext, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { CreateTaskFunction, Task, useTasks } from "../../hooks/useTasks";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";

import "./TaskList.scss";

interface TaskContextArgs {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (task: Task, id: string) => void;
  createTask: CreateTaskFunction;
}

export const TaskContext = createContext<TaskContextArgs>({
  tasks: [],
  deleteTask: () => {},
  updateTask: () => {},
  createTask: () => {},
});

const TaskList = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks, deleteTask, updateTask, createTask } = useTasks();

  return (
    <TaskContext.Provider value={{ tasks, deleteTask, updateTask, createTask }}>
      <div className="task-list">
        <h2>My Tasks</h2>
        <hr />
        <ul>
          {tasks
            .sort((a, _) => (a.isComplete ? 1 : -1))
            .map((task) => (
              <TaskItem key={task.id} {...task} />
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
    </TaskContext.Provider>
  );
};

export default TaskList;
