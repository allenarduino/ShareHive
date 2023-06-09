import React from "react";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const Center = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
`;

const Loader = () => {
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <Center style={{ backgroundColor: theme_state.background }}>
      <FadeLoader color={theme_state.color} style={{ position: "fixed" }} />
    </Center>
  );
};

export default Loader;
