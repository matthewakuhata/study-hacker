import { useState } from "react";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

import SettingsModal from "./SettingsModal";

import "./Header.scss";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="header">
      <img src="logo" alt="pomo logo" />
      <nav>
        <link />
        navigation
      </nav>
      <SettingsSuggestIcon
        onClick={() => {
          setShowModal(true);
        }}
        className="header__settings"
      />
      <SettingsModal show={showModal} closeModal={() => setShowModal(false)} />
    </header>
  );
};

export default Header;
