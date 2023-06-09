import styled from "styled-components";

//Container for posts and side nav
export const ContentContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  padding-bottom: 100px;
`;

export const LeftSide = styled.div`
  @media (max-width: ${769}px) {
    display: none;
  }
  width: 200px;
  align-self: flex-start;
  float: left;
  height: 100vh;
  position: fixed;
  left: 0;
  scroll: no;
`;

//conatainer for posts except side navs
export const Middle = styled.div`
  @media (max-width: ${769}px) {
    width: 100%;
  }
  width: 45%;
  overflow: hidden;
  margin: 0 auto;
  height: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 80px;
  padding-bottom: 80px;
`;

//container for side nav
export const RightSide = styled.div`
  @media (max-width: ${769}px) {
    display: none;
    width: 10%;
  }

  width: 30%;
  float: right;
  position: fixed;
  scroll: no;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const UserCard = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 0px 2px;
  margin-top: 100px;
  width: 70%;
  height: 300px;
  align-self: center;
`;

export const Avatar = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  align-self: center;
  margin-top: 20px;
  border: 2px solid white;
`;
