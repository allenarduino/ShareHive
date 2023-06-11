import React from "react";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
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
