import styled from "styled-components";

//Container for User profile picture
export const ProfileContainer = styled.div`
  padding: 0;
  marigin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CoverPhoto = styled.img`
  width: 100%;
  margin: 0px;
  padding: 0px;
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
  cursor: pointer;
`;

export const Avatar = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  align-self: center;
  margin-top: 20px;
`;
