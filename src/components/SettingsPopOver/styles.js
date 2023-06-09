import styled from "styled-components";

export const SettingsMain = styled.div`
  display: flex;
  align-self: center;
  width: 100px;
  height: 200px;
  margin-left: 80px;

  font-weight: bold;
  flex-direction: column;
  padding: 10px 0;
  right: 0;
  margin-top: 50px;
  margin-right: 20px;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 999999;
  border-radius: 15px;
  min-width: 250px;
  box-shadow: rgba(136, 153, 166, 0.2) 0px 0px 15px,
    rgba(136, 153, 166, 0.15) 0px 0px 3px 1px;
`;

export const SettingsHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #3333;
  width: 100%;
  height: 30px;
  padding-left: 15px;
`;

export const SettingsTitle = styled.b`
  font-weight: bold;
`;

export const Choices = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #3333;
`;
export const ThemeText = styled.b`
  font-weight: bold;
`;

export const Spacer = styled.div`
  width: 100px;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 20px;
  margin-left: 10px;
`;
export const LogoutButtonContainer = styled.div`
  width: 100%;
  display: flex;
`;
export const LogoutButton = styled.div`
  text-align: center;
  border-radius: 9999px;
  color: #fff;
  font-size: 14px;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #e3405f;
  margin-top: 80px;
  width: 100px;
  align-self: center;
`;
