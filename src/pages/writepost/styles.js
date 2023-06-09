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

export const CenterInput = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

export const InputField = styled.textarea`
  padding-top: 20px;
  font-size: 20px;
  height: 200px;
  padding-left: 10px;
  border: 2px solid transparent;
`;

export const SubmitButton = styled.button`
  @media (max-width: ${769}px) {
    display: none;
  }
  width: 320px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  color: #fff;
  border: 2px solid #e3405f;
  background-color: #e3405f;
`;
