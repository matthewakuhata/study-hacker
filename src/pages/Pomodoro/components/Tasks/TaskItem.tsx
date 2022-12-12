import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { SvgIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";

import { DropdownMenu } from "../../../../shared/components/DropdownMenu/DropdownMenu";
import CreateTask from "./CreateTask";
import { TaskContext } from "./TaskList";
import { convertToDisplayTime } from "../../../../helpers/convertToDisplayTime";

import "./TaskItem.scss";

interface TaskItemProps {
  title: string;
  description: string;
  pomodoros: number;
  isComplete: boolean;
  id: string;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  pomodoros,
  isComplete,
  id,
  index,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [complete, setComplete] = useState(isComplete);
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const [editMode, setEditMode] = useState(false);
  const { deleteTask, updateTask } = useContext(TaskContext);

  const handleOpenMenu = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setShowMenu(false);
  };

  const deleteTaskHandler = () => {
    deleteTask(id);
    handleCloseMenu();
  };

  const completeTaskHandler = () => {
    setComplete(!isComplete);
    updateTask(
      {
        isComplete: !isComplete,
      },
      id
    );
  };

  return editMode ? (
    <CreateTask
      closeHandler={() => setEditMode(false)}
      task={{ id, title, description, pomodoros, isComplete }}
    />
  ) : (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-item ${complete && "complete"}`}
        >
          <div className="task-item__heading">
            <div className="finished-icon__wrapper">
              <SvgIcon
                onClick={completeTaskHandler}
                className={`finished-icon ${complete && "finished"}`}
                component={CheckCircleOutlineIcon}
              />
            </div>
            <h2>{title}</h2>
            <span>0/{pomodoros}</span>
            <SvgIcon
              className={`three-dot-icon ${showMenu && "show"}`}
              onClick={handleOpenMenu}
              component={MoreVertIcon}
            />
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
            {/* <p>Pomodoros: {pomodoros}</p> */}
            <p>Est. Remaining: {calculateTotalTime(pomodoros)} </p>
          </div>
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
            <MenuItem onClick={deleteTaskHandler}>
              <SvgIcon className="icon" component={DeleteIcon} />
              Delete
            </MenuItem>
          </DropdownMenu>
        </li>
      )}
    </Draggable>
  );
};

function calculateTotalTime(pomodoros: number) {
  const timers = JSON.parse(localStorage.getItem("pomo-timers") || "{}");
  return convertToDisplayTime(
    pomodoros * (timers?.pomodoro?.seconds || 0),
    "hms"
  );
}

export default TaskItem;
