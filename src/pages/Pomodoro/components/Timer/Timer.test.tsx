import Timer from "./Timer";
import { render, fireEvent, screen } from "@testing-library/react";

describe("GIVEN a timer component", () => {
  const timerValues = [10, 20, 30];
  const timerStrings = timerValues.map((val) => `00:${val}`);

  beforeEach(() => {
    render(<Timer timerValues={Object.values(timerValues)} />);
  });

  describe("WHEN rendering the timer", () => {
    test("THEN the default timer selected should be Pomodoro", () => {
      const timer = screen.getByTestId("timer");
      expect(timer).toHaveTextContent(timerStrings[0]);
    });
  });

  describe("WHEN clicking Short Break Button", () => {
    test("THEN the timer should be at 20 seconds", () => {
      const short = screen.getByText("Short Break");
      const timer = screen.getByTestId("timer");

      fireEvent.click(short);
      expect(timer).toHaveTextContent(timerStrings[1]);
    });
  });

  describe("WHEN clicking Long Break Button", () => {
    test("THEN the timer should be at 30 seconds", () => {
      // render(<Timer timerValues={timerValues} />);

      const long = screen.getByText("Long Break");
      const timer = screen.getByTestId("timer");

      fireEvent.click(long);
      expect(timer).toHaveTextContent(timerStrings[2]);
    });
  });

  describe("WHEN clicking Pomodoro Button", () => {
    test("THEN the timer should be at 10 seconds", () => {
      // render(<Timer timerValues={timerValues} />);

      const pomo = screen.getByText("Pomodoro");
      const long = screen.getByText("Long Break");
      const timer = screen.getByTestId("timer");

      fireEvent.click(long);
      fireEvent.click(pomo);
      expect(timer).toHaveTextContent(timerStrings[0]);
    });
  });
});
