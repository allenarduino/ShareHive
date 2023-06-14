import React from "react";
import { useHistory } from "react-router-dom";
import { CreatePostButton, HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";
import PopOver from "../PopOver/PopOver";
import SettingsPopOver from "../SettingsPopOver/SettingsPopOver";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

//General Header for Desktop
const DeskTopHeader = () => {
  const history = useHistory();
  const [Pop_visible, setPop_visible] = React.useState(false);
  const [settingsVisible, setSettingsVisible] = React.useState(false);
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <div>
      <HeaderDesign style={{ backgroundColor: theme_state.background }}>
        <b
          onClick={() => history.push("/")}
          style={{
            display: "flex",
            alignSelf: "center",
            fontSize: 25,
            color: theme_state.color,
            fontStyle: "italic",
            cursor: "pointer",
          }}
        >
          Share<span style={{ color: "#e3405f" }}>Hive</span>
        </b>
        <Spacer></Spacer>
        <HeaderRight>
          <CreatePostButton onClick={() => setPop_visible(!Pop_visible)}>
            Create Post
          </CreatePostButton>
          <Icon.Settings
            style={{ color: theme_state.color, cursor: "pointer" }}
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
