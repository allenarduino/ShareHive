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
`;

export const NavOptionItem = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
`;
