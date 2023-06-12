import styled from "styled-components";

export const LauncherBackground = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  flex: 1;
  align-items: center;
  bottom: 0px;
  top: 0px;
  margin: 0px;
  position: fixed;
  z-index: 5;
`;

export const LaucnherLogo = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 35px;
  font-style: italic;
  margin-bottom: 30px;
  @media (max-width: ${800}px) {
    font-size: 25px;
  }
`;
