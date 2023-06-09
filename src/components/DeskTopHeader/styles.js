import styled from "styled-components";

export const HeaderDesign = styled.header`
  @media (max-width: ${769}px) {
    display: none;
  }
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  background-color: #fff;
  display: flex;
  box-shadow: 0px 0px 2px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const Spacer = styled.div`
  flex: 1;
  display: flex;
`;

export const HeaderRight = styled.div`
  @media (max-width: ${769}px) {
    display: none;
  }
  display: flex;
  flex-direction: row;
  margin-right: 100px;
  width: 200px;
  justify-content: space-around;
`;
