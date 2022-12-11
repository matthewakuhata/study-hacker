import React, { createRef, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { SvgIcon } from "@mui/material";

import { Button, Input } from "../../../../shared/components/Form";
import { Task } from "./TaskList";

import "./CreateTask.scss";

interface CreateTaskProps {
  closeHandler: () => void;
  task?: Task;
}

const CreateTask: React.FC<CreateTaskProps> = ({ closeHandler, task }) => {
  const [hasNote, setHasNote] = useState(task && task.description !== "");
  const pomoRef = createRef<HTMLInputElement>();

  const updatePomos = (val: number) => {
    if (!pomoRef || !pomoRef.current) return;

    const newValue = parseInt(pomoRef.current.value, 10) + val;
    if (newValue < 1) return;

    pomoRef.current.value = newValue.toString();
  };

  const onSaveHandler = () => {
    //Do somethign to save
    closeHandler();
  };

  return (
    <div>
      <div className="create-task">
        <Input
          placeholder="What are you working on?"
          className="create-task__title"
          defaultValue={task?.title}
          type="text"
        />
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
        <SvgIcon
          onClick={closeHandler}
          component={CloseIcon}
          className="close"
        />
      </div>
      <div className="create-task__actions">
        <Button
          onClick={onSaveHandler}
          className="create-task__actions__button"
          color="black"
          displaySize="s"
          displayType="outline"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
