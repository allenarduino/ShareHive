import React from "react";
import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { Fade } from "react-reveal";
import Light from "../../assets/icons/light.svg";
import Dark from "../../assets/icons/dark.svg";
import {
  SettingsMain,
  SettingsHeader,
  SettingsTitle,
  Choices,
  Img,
  LogoutButton,
  ThemeText,
  Spacer
} from "./styles";

import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";

const SettingsPopOver = () => {
  const history = useHistory();
  const { theme_state, theme_dispatch } = React.useContext(ThemeContext);
  const { auth_dispatch } = React.useContext(AuthContext);
  const set_light_theme = () => {
    theme_dispatch({ type: "LIGHT_MODE" });
  };
  const set_dark_theme = () => {
    theme_dispatch({ type: "DARK_MODE" });
  };

  const logout = () => {
    auth_dispatch({ type: "LOGOUT" });
    history.push("/login");
  };
  return (
    <SettingsMain style={{ backgroundColor: theme_state.background }}>
      <SettingsHeader>
        <SettingsTitle style={{ color: theme_state.color }}>
          Settings
        </SettingsTitle>
      </SettingsHeader>
      <Choices>
        <ThemeText style={{ color: theme_state.color }}>Theme</ThemeText>
        <Spacer>
          <Img
            src={Dark}
            onClick={() => set_dark_theme()}
            style={{ border: theme_state.is_dark ? "3px solid #e3405f " : "" }}
          />
          <Img
            src={Light}
            onClick={() => set_light_theme()}
            style={{ border: theme_state.is_dark ? "" : "3px solid #e3405f " }}
          />
        </Spacer>
      </Choices>
      <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
    </SettingsMain>
  );
};

export default SettingsPopOver;
