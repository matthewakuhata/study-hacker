import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pomodoro } from "./pages/Pomodoro";
import Header from "./shared/components/Navigation/Header";
import {
  initialTimersValue,
  PomodoroTimers,
  UpdateTimerValueFunction,
  useTimerValues,
} from "./pages/Pomodoro/hooks/useTimers";
import { createContext } from "react";

interface AppContextArgs {
  timerValues: PomodoroTimers;
  updateTimerValue: UpdateTimerValueFunction;
}
export const AppContext = createContext<AppContextArgs>({
  timerValues: initialTimersValue,
  updateTimerValue: () => {},
});

function App() {
  const { timerValues, updateTimerValue } = useTimerValues();

  return (
    <AppContext.Provider value={{ timerValues, updateTimerValue }}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pomodoro />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
