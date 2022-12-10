import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./shared/components/Navigation/Header";
import { Pomodoro } from "./pages/Pomodoro";
import { TimersProvider } from "./pages/Pomodoro/contexts/timers";

function App() {
  return (
    <TimersProvider>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            {/* Add AppWrap for elements usecontext inside route */}
            <Route path="/" element={<Pomodoro />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TimersProvider>
  );
}

export default App;
