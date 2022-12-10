import Timer from "./components/Timer/Timer";
import Tasks from "./components/Tasks";

const Pomodoro = () => {
  return (
    <div className="pomodoro">
      <Timer timerValues={[120, 240, 480]} />
      <Tasks />
      <div className="pomodoro__container">totals</div>
    </div>
  );
};

export default Pomodoro;
