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

//Container for User profile picture
export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 614px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const CoverPhoto = styled.img`
  width: 100%;
  height: 40vh;
  border-bottom-left-radius: 50% 40%;
`;

export const UserImg = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  align-self: center;
  margin-top: -40px;
  border: 2px solid white;
`;

export const FullName = styled.h4`
  font-weight: 900;
  align-self: center;
  font-size: 20px;
`;

export const Bio = styled.b`
  align-self: center;
  margin-top: -10px;
`;

export const EditProfileButton = styled.button`
  align-self: center;
  border: 2px solid #e3405f;
  background-color: #e3405f;
  width: 200px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 30px;
  margin-top: 20px;
  border-radius: 20px;
  color: #fff;
`;

//conatainer for posts except side nav
export const PostsContainer = styled.div`
  width: 100%;
  max-width: 614px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

//container for side nav
export const SideNav = styled.section`
  @media (max-width: ${1000}px) {
    display: none;
  }
  max-width: 250px;
  position: fixed;
  left: 60%;
  top: 84px;
  transform: translateX(calc(-50% + 322px));
  flex-direction: column;
  box-shadow: 0px 0px 2px;
  width: 30vw;
  height: 40vh;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

export const Avatar = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  align-self: center;
  margin-top: 20px;
`;
