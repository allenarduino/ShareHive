import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";
import PopOver from "../PopOver/PopOver";
import SettingsPopOver from "../SettingsPopOver/SettingsPopOver";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

//General Header for Desktop
const DeskTopHeader = () => {
  const [Pop_visible, setPop_visible] = React.useState(false);
  const [settingsVisible, setSettingsVisible] = React.useState(false);
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <div>
      <HeaderDesign style={{ backgroundColor: theme_state.background }}>
        <b
          style={{
            display: "flex",
            alignSelf: "center",
            fontSize: 25,
            color: theme_state.color
          }}
        >
          Merllon
        </b>
        <Spacer></Spacer>
        <HeaderRight>
          <Link to="/" style={{ color: theme_state.color }}>
            <Icon.Home size={25} />
          </Link>
          <Icon.PlusCircle
            size={25}
            onClick={() => setPop_visible(!Pop_visible)}
            style={{ color: theme_state.color }}
          />
          <Link to="/profile" style={{ color: theme_state.color }}>
            <Icon.User size={25} />
          </Link>
          <Icon.Settings
            style={{ color: theme_state.color }}
            onClick={() => setSettingsVisible(!settingsVisible)}
          />
        </HeaderRight>
      </HeaderDesign>
      {settingsVisible ? <SettingsPopOver /> : null}
      {Pop_visible ? <PopOver /> : null}
    </div>
  );
};

export default DeskTopHeader;
