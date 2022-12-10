import Timer from "./components/Timer/Timer";
import Tasks from "./components/Tasks";

const Pomodoro = () => {
  return (
    <div className="pomodoro">
      <Timer />
      <Tasks />
      <div className="pomodoro__container">totals</div>
    </div>
  );
};

export default Pomodoro;
