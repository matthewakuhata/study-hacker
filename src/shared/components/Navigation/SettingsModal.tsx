import React, { useContext } from "react";
import {
  PomodoroTimersKeys,
  TimersContext,
} from "../../../pages/Pomodoro/contexts/timers";

import Modal, { ModalProps } from "../Modal/Modal";

const SettingsModal: React.FC<ModalProps> = ({ show, closeModal }) => {
  const { timerValues, updateTimerValue } = useContext(TimersContext);

  const updateTimerHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: PomodoroTimersKeys
  ) => {
    updateTimerValue(name, parseInt(e.target.value, 10) * 60 || 60);
  };

  return (
    <Modal className={"setting-modal"} show={show} closeModal={closeModal}>
      <h3>TIMER SETTINGS</h3>
      <hr />
      {timerValues && (
        <div className="setting-modal__timers">
          <div className="setting-modal__timer">
            <h5>{timerValues.pomodoro.name.toUpperCase()}</h5>
            <input
              min={1}
              onChange={(e) => updateTimerHandler(e, "pomodoro")}
              type="number"
              defaultValue={Math.floor(timerValues.pomodoro.seconds / 60)}
            />
          </div>{" "}
          <div className="setting-modal__timer">
            <h5>{timerValues.short.name.toUpperCase()}</h5>
            <input
              min={1}
              onChange={(e) => updateTimerHandler(e, "short")}
              type="number"
              defaultValue={Math.floor(timerValues.short.seconds / 60)}
            />
          </div>{" "}
          <div className="setting-modal__timer">
            <h5>{timerValues.long.name.toUpperCase()}</h5>
            <input
              min={1}
              onChange={(e) => updateTimerHandler(e, "long")}
              type="number"
              defaultValue={Math.floor(timerValues.long.seconds / 60)}
            />
          </div>
        </div>
      )}
      {/* TODO Add close button and handler */}
      <span>X</span>
    </Modal>
  );
};

export default SettingsModal;
