import React, { useState } from "react";
import { SvgIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";

import "./TaskItem.scss";
import { DropdownMenu } from "../../../../shared/components/DropdownMenu/DropdownMenu";
import CreateTask from "./CreateTask";

interface TaskItemProps {
  title: string;
  description: string;
  pomodoros: number;
  isComplete: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  pomodoros,
  isComplete,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [complete, setComplete] = useState(isComplete);
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const [editMode, setEditMode] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setShowMenu(false);
  };

  const deleteTaskHandler = () => {};
  const saveTaskHandler = () => {};

  return editMode ? (
    <CreateTask
      closeHandler={() => setEditMode(false)}
      task={{ title, description, pomodoros, isComplete }}
    />
  ) : (
    <div className={`task-item ${complete && "complete"}`}>
      <div className="task-item__heading">
        <div className="finished-icon__wrapper">
          <SvgIcon
            onClick={() => setComplete((prev) => !prev)}
            className={`finished-icon ${complete && "finished"}`}
            component={CheckCircleOutlineIcon}
          />
        </div>
        <h2>{title}</h2>
      </div>
      <p
        className={showFullText ? "" : "clamp"}
        onClick={() => {
          setShowFullText((prev) => !prev);
        }}
      >
        {description}
      </p>
      <div className="task-item__time-totals">
        <p>Pomodoros: {pomodoros}</p>
        <p>Total Time: {calculateTotalTime()} </p>
      </div>
      <div className={`task-item__menu--wrapper ${showMenu && "show"}`}>
        <SvgIcon
          className="three-dot-icon"
          onClick={handleOpenMenu}
          component={MoreVertIcon}
        />
        <DropdownMenu
          className="task-item__menu"
          anchorEl={anchorEl}
          open={showMenu}
          onClose={handleCloseMenu}
        >
          {!complete && (
            <MenuItem
              onClick={() => {
                setEditMode(true);
                handleCloseMenu();
              }}
              className="task-item__menu-item"
            >
              <SvgIcon
                className="icon"
                onClick={() => {}}
                component={EditIcon}
              />
              Edit
            </MenuItem>
          )}
          <MenuItem>
            <SvgIcon
              className="icon"
              onClick={() => {}}
              component={DeleteIcon}
            />
            Delete
          </MenuItem>
        </DropdownMenu>
      </div>
    </div>
  );
};

function calculateTotalTime() {
  return 1;
}

export default TaskItem;
