import styled from "styled-components";

export const PopOverContainer = styled.div`
  @media (max-width: ${769}px) {
    display: none;
  }
  width: 250px;
  height: 300px;
  z-index: 5;
  background-color: #fff;
  position: fixed;
  align-self: flex-end;
  right: 70px;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  font-weight: bold;
`;
//For choosing image and video
export const FileInput = styled.input`
  display: none;
`;
