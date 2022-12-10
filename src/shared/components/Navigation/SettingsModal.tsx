import React, { useContext } from "react";

import Modal, { ModalProps } from "../Modal/Modal";
import { AppContext } from "../../../App";

const SettingsModal: React.FC<ModalProps> = ({ show, closeModal }) => {
  const { timerValues, updateTimerValue } = useContext(AppContext);

  return (
    <Modal className={"setting-modal"} show={show} closeModal={closeModal}>
      <h3>TIMER SETTINGS</h3>
      <hr />
      <div className="setting-modal__timers">
        <div className="setting-modal__timer">
          <h5>{timerValues.pomodoro.name.toUpperCase()}</h5>
          <input
            onChange={(e) => {
              updateTimerValue("pomodoro", parseInt(e.target.value, 10) * 60);
            }}
            type="number"
            defaultValue={Math.floor(timerValues.pomodoro.seconds / 60)}
          />
        </div>{" "}
        <div className="setting-modal__timer">
          <h5>{timerValues.short.name.toUpperCase()}</h5>
          <input
            onChange={(e) => {
              updateTimerValue("short", parseInt(e.target.value, 10) * 60);
            }}
            type="number"
            defaultValue={Math.floor(timerValues.short.seconds / 60)}
          />
        </div>{" "}
        <div className="setting-modal__timer">
          <h5>{timerValues.long.name.toUpperCase()}</h5>
          <input
            onChange={(e) => {
              updateTimerValue("long", parseInt(e.target.value, 10) * 60);
            }}
            type="number"
            defaultValue={Math.floor(timerValues.long.seconds / 60)}
          />
        </div>
      </div>
      <span>X</span>
    </Modal>
  );
};

export default SettingsModal;
