import Timer from "./components/Timer/Timer";
import TaskList from "./components/Tasks";

import "./Pomodoro.scss";
import { TasksProvider } from "./contexts/tasks";

const Pomodoro = () => {
  return (
    <div className="pomodoro">
      <Timer />
      <TasksProvider>
        <TaskList />
        <div className="pomodoro__container">totals</div>
      </TasksProvider>
    </div>
  );
};

export default Pomodoro;
