import React, { createRef, useContext, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { SvgIcon } from "@mui/material";

import { Button, Input } from "../../../../shared/components/Form";
import { Task } from "../../hooks/useTasks";

import "./CreateTask.scss";
import { TaskContext } from "./TaskList";

interface CreateTaskProps {
  closeHandler: () => void;
  task?: Partial<Task>;
}
//TODO: Add custom textarea for note
const CreateTask: React.FC<CreateTaskProps> = ({ closeHandler, task }) => {
  const [hasNote, setHasNote] = useState(task && task.description !== "");
  const pomoRef = createRef<HTMLInputElement>();
  const noteRef = createRef<HTMLInputElement>();
  const titleRef = createRef<HTMLInputElement>();
  const { updateTask, createTask } = useContext(TaskContext);

  const updatePomos = (val: number) => {
    if (!pomoRef || !pomoRef.current) return;

    const newValue = parseInt(pomoRef.current.value, 10) + val;
    if (newValue < 1) return;

    pomoRef.current.value = newValue.toString();
  };

  const onSaveHandler = () => {
    if (task && task.id) {
      updateTask(
        {
          title: titleRef.current?.value || "",
          description: noteRef.current?.value || "",
          pomodoros: parseInt(pomoRef.current?.value || "1"),
        },
        task.id
      );
    } else {
      createTask({
        title: titleRef.current?.value || "",
        description: noteRef.current?.value || "",
        pomodoros: parseInt(pomoRef.current?.value || "1"),
      });
    }

    closeHandler();
  };

  return (
    <div>
      <div className="create-task">
        <header>
          <Input
            ref={titleRef}
            placeholder="What are you working on?"
            className="create-task__title"
            defaultValue={task?.title}
            type="text"
          />
          <SvgIcon
            onClick={closeHandler}
            component={CloseIcon}
            className="close"
          />
        </header>
        <label>Est. Pomodoro's</label>
        <div className="create-task__pomo">
          <Input
            ref={pomoRef}
            defaultValue={task?.pomodoros || 1}
            min={1}
            className="create-task__pomo__input"
            type="number"
          />
          <Button
            onClick={() => updatePomos(1)}
            className="create-task__pomo__button"
          >
            <KeyboardArrowUpIcon />
          </Button>
          <Button
            onClick={() => updatePomos(-1)}
            className="create-task__pomo__button"
          >
            <KeyboardArrowDownIcon />
          </Button>
        </div>
        {hasNote ? (
          <Input
            ref={noteRef}
            placeholder="Describe your task..."
            className="create-task__desc"
            type="text"
            defaultValue={task?.description}
          />
        ) : (
          <Button
            className="create-task__note"
            displaySize="xs"
            displayType="text"
            onClick={() => setHasNote((prev) => !prev)}
          >
            + Add Note
          </Button>
        )}
      </div>
      <div className="create-task__actions">
        <Button
          onClick={onSaveHandler}
          className="create-task__actions__button"
          displaySize="s"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
