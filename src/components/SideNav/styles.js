import styled from "styled-components";

export const SideNavContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 0px 2px;
  height: 300px;
  width: 300px;
  margin-top: 100px;
  display: flex;
  position: sticky;
  overflow: hidden;
`;

export const NavOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  padding-left: 100px;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const NavOptionItem = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-self: flex-start;
  &:hover {
    font-size: 22px;
  }
`;

export const LogoutButtonContainer = styled.div`
  width: 100%;
  display: flex;
`;
export const LogoutButton = styled.div`
  text-align: center;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #e3405f;
  margin-top: 80px;
  width: 100px;
  align-self: center;
  bottom: 0px;
  position: absolute;
  margin-bottom: 50px;
  cursor: pointer;
`;
