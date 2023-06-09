import styled from "styled-components";

export const ImageContainer = styled.div`
  @media (min-width: ${769}px) {
    display: flex;
    background: rgba(0, 0, 0, 0.9);
  }
  flex: 1;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  position: fixed;
`;
export const Image = styled.img`
  @media (min-width: ${769}px) {
    align-self: center;
    max-width: 500px;
  }
  height: 90vh;
  bottom: 0px;
  width: 100%;
`;

export const BackArrowContainer = styled.div`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
`;
