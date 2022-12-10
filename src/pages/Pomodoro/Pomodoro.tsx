import Timer from "./components/Timer/Timer";
import TaskList from "./components/Tasks";

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
