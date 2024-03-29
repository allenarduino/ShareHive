import React from "react";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import SettingsPopOver from "../SettingsPopOver/SettingsPopOver";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

//Header for home on phone screen sizes
const HomeHeader = () => {
  const history = useHistory();
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
            color: theme_state.color,
            fontStyle: "italic",
            fontSize: 20,
          }}
        >
          Share<span style={{ color: "#e3405f" }}>Hive</span>
        </b>
        <Spacer></Spacer>
        <Icon.Settings
          onClick={() => setSettingsVisible(!settingsVisible)}
          style={{ marginRight: 50 }}
          color={theme_state.color}
        />
        {settingsVisible ? <SettingsPopOver /> : null}
      </HeaderDesign>
    </div>
  );
};

export default HomeHeader;
