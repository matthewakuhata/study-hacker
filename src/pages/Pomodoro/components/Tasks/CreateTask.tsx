import React, { createRef, useRef, useState } from "react";
import { Button, Input } from "../../../../shared/components/Form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./CreateTask.scss";

const CreateTask = () => {
  const [hasNote, setHasNote] = useState(false);
  const pomoRef = createRef<HTMLInputElement>();

  const updatePomos = (val: number) => {
    if (!pomoRef || !pomoRef.current) return;

    const newValue = parseInt(pomoRef.current.value, 10) + val;
    if (newValue < 1) return;

    pomoRef.current.value = newValue.toString();
  };

  return (
    <div className="create-task task-item">
      <Input
        placeholder="What are you working on?"
        className="create-task__title"
        type="text"
      />
      <label>Est. Pomodoro's</label>
      <div className="create-task__pomo">
        <Input
          ref={pomoRef}
          defaultValue={1}
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
      <Button
        className="create-task__note"
        displaySize="xs"
        displayType="outline"
        onClick={() => setHasNote((prev) => !prev)}
      >
        {hasNote ? "Remove Note" : "+ Add Note"}
      </Button>
      {hasNote && <Input className="create-task__desc" type="text" />}
    </div>
  );
};

export default CreateTask;
