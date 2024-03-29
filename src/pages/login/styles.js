import styled from "styled-components";

export const LoginBackground = styled.div`
  height: 100vh;
  right: 0;
  left: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 30px;
  overflow: auto;
  display: flex;
  justify-content: center;

  @media (max-width: ${800}px) {
    min-height: 100vh;
    height: 100%;
  }
`;

export const LoginGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  width: 90%;
  align-items: center;
  height: auto;

  @media (max-width: ${800}px) {
    grid-template-columns: 1fr;
    width: 95%;
    max-width: 500px;
  }

  @media (max-width: ${600}px) {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 500px;
  }
`;
export const LoginContainer = styled.div``;

export const LoginHeaderText = styled.h4`
  text-align: center;
  font-weight: bold;
  font-size: 35px;
  font-style: italic;
  margin-bottom: 30px;
  @media (max-width: ${800}px) {
    font-size: 25px;
  }
`;

export const Form = styled.div`
  border-radius: 3px;
  padding: 0 10px;
  padding-top: 3px;
`;

export const CenterInput = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginInput = styled.input`
  width: 80%;
  padding-left: 20px;
  height: 40px;
  margin-top: 40px;
  border-radius: 5px;
  border: 0.5px solid whitesmoke;
  background-color: transparent;
  color: #ffff;

  @media (max-width: ${800}px) {
    width: 100%;
  }
`;

export const ErrorMessage = styled.b`
  color: red;
`;

export const SubMit = styled.button`
  width: 85%;
  padding-left: 5px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 40px;
  border-radius: 5px;
  color: #fff;
  border: 2px solid #e3405f;
  cursor: pointer;
  @media (max-width: ${800}px) {
    width: 95%;
  }
`;

export const LoadingButton = styled.button`
  width: 85%;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 40px;
  border-radius: 5px;
  color: #fff;
  border: 2px solid #e3405f;
  @media (max-width: ${800}px) {
    width: 95%;
  }
`;

export const LinkText = styled.a`
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;
`;

export const InputErrorText = styled.div`
  color: red;
  font-size: 15px;
  text-align: center;
  width: 70%;
`;

export const LoginImageCol = styled.div`
  overflow: hidden;
  border-radius: 15px;
  height: 500px;
  margin-top: 50px;
`;

export const LoginImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
