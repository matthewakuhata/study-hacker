import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./shared/components/Navigation/Header";
import { Pomodoro } from "./pages/Pomodoro";
import { TimersProvider } from "./pages/Pomodoro/contexts/timers";
import React from "react";

// TODO: Maybe add CSSTransition package.
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          {/* Add AppWrap for elements usecontext inside route */}
          <Route
            path="/"
            element={
              <TimersProvider>{WrapHeader(<Pomodoro />)}</TimersProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const WrapHeader = (components: React.ReactNode) => {
  return (
    <>
      <Header />
      {components}
    </>
  );
};

export default App;
