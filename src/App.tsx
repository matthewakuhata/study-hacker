import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pomodoro from "./pages/Pomodoro";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pomodoro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
