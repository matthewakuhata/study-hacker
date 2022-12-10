import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pomodoro } from "./pages/Pomodoro";
import Header from "./shared/components/Navigation/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pomodoro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
