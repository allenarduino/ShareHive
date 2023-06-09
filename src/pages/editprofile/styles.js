import styled from "styled-components";

//container for the sapce except Top nav
export const MainContainer = styled.main`
  display: flex;
  flex: 1;
  margin-bottom: 80px;
  margin: 0 auto;
  justify-content: center;
  height: 100vh;
`;

//Container for posts and side nav
export const ContentConatainer = styled.section`
  width: 100%;
  max-width: 934px;
  padding: 0 0 8px;
  margin: 0 auto;
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
  height: 30vh;
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

//For choosing image
export const FileInput = styled.input`
  display: none;
`;

export const NameInput = styled.input`
  width: 250px;
  padding-left: 20px;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid #3333;
  align-self: center;
`;

export const BioInput = styled.textarea`
  align-self: center;
  padding-left: 20px;
  padding-top: 10px;
  height: 40px;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid #3333;
  width: 250px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 250px;
  align-self: center;
  height: 40px;
`;

export const BioInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 250px;
  align-self: center;
  height: 50px;
  margin-top: 20px;
`;
