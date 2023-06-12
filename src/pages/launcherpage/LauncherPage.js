import React from "react";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { LaucnherLogo, LauncherBackground } from "./style";

const LauncherPage = () => {
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <LauncherBackground style={{ backgroundColor: theme_state.background }}>
      <LaucnherLogo
        style={{
          color: theme_state.color,
        }}
      >
        Share<span style={{ color: "#e3405f" }}>Hive</span>
      </LaucnherLogo>
    </LauncherBackground>
  );
};

export default LauncherPage;
