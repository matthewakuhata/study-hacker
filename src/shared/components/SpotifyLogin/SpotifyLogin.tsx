import React from "react";
import SpotifyLogo from "../../../images/spotify.png";

import "./SpotifyLogin.scss";

const AUTH_URL = `https://accounts.spotify.com/en/authorize?client_id=95cbfe96a9ec47fd854a0c5f353ea03e&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
const SpotifyLogin = () => {
  return (
    <a className="spotify-login" href={AUTH_URL}>
      <img src={SpotifyLogo} alt="spotify logo" /> Login With Spotify
    </a>
  );
};

export default SpotifyLogin;
