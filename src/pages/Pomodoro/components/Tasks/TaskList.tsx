import { createContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { CreateTaskFunction, Task, useTasks } from "../../hooks/useTasks";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";

import "./TaskList.scss";

interface TaskContextArgs {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (task: Partial<Task>, id: string) => void;
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
  const { tasks, reorderTasks, deleteTask, updateTask, createTask } =
    useTasks();

  const onDragEndHandler = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <TaskContext.Provider value={{ tasks, deleteTask, updateTask, createTask }}>
      <div className="task-list">
        <h2>My Tasks</h2>
        <hr />
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                id="tasks"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks
                  .sort((a, b) => (a.isComplete ? 1 : b.isComplete ? -1 : 1))
                  .map((task, index) => (
                    <TaskItem key={task.id} {...task} index={index} />
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

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
      </div>
    </TaskContext.Provider>
  );
};

export default TaskList;
