import Timer from "./components/Timer/Timer";
import TaskList from "./components/Tasks";

import "./Pomodoro.scss";

const Pomodoro = () => {
  return (
    <div className="pomodoro">
      <Timer />
      <TaskList />
      <div className="pomodoro__container">totals</div>
    </div>
  );
};

export default Pomodoro;
