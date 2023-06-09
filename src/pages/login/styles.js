import styled from "styled-components";

export const LoginBackground = styled.div`
  height: 100vh;
  max-height: 100vh;
  min-height: 100vh;
  right: 0;
  left: 0;
  flex: 1;
  position: fixed;
`;

export const LoginContainer = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const LoginHeaderText = styled.h4`
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 30px;
`;

export const Form = styled.form.attrs({
  className: "form-group"
})`
  border-radius: 3px;
  padding: 0 10px;
  padding-top: 3px;
`;

export const CenterInput = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginInput = styled.input`
  width: 300px;
  padding-left: 20px;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid #3333;
`;

export const ErrorMessage = styled.b`
  color: red;
`;

export const SubMit = styled.input`
  width: 320px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  color: #fff;
  border: 2px solid #e3405f;
`;

export const LoadingButton = styled.button`
  width: 320px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  color: #fff;
  border: 2px solid #e3405f;
`;

export const LinkText = styled.a`
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;
`;
