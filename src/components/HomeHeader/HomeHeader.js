import React from "react";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";
import SettingsPopOver from "../SettingsPopOver/SettingsPopOver";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

//Header for home on phone screen sizes
const HomeHeader = () => {
  const [settingsVisible, setSettingsVisible] = React.useState(false);
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <div>
      <HeaderDesign style={{ backgroundColor: theme_state.background }}>
        <b
          style={{
            display: "flex",
            alignSelf: "center",
            color: theme_state.color
          }}
        >
          Merllon
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
