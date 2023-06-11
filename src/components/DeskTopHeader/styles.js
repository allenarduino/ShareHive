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
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 2;
`;

export const Spacer = styled.div`
  flex: 1;
  display: flex;
`;

export const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 100px;
  width: 200px;
  justify-content: space-around;
`;

export const CreatePostButton = styled.button`
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: #e3405f;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
`;
