import styled from "styled-components";

export const Header = styled.div`
  @media (min-width: ${769}px) {
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
  z-index: 2;
`;

export const Spacer = styled.div`
  flex: 1;
  display: flex;
`;

export const HeaderRight = styled.div`
  margin-right: 40px;
`;
