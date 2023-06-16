import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { Fade } from "react-reveal";
import * as Icon from "react-feather";
import { v4 as uuidv4 } from "uuid";
import {
  MainContainer,
  ContentConatainer,
  ProfileContainer,
  CoverPhoto,
  UserImg,
  NameInput,
  BioInput,
  FileInput,
  InputContainer,
  BioInputContainer,
} from "./styles";
import { databases, storage } from "../../appwrite/appwriteConfig";

const EditProfile = () => {
  const [user_img, setUser_img] = React.useState(null);
  const [coverphoto, setCoverphoto] = React.useState(null);
  const [user_imgPreview, setUser_imgPreview] = React.useState(null);
  const [coverphotoPreview, setCoverphotoPreview] = React.useState(null);
  const [coverphoto_selected, setCoverphotoSelected] = React.useState(false);
  const [user_img_selected, setUserImgSelected] = React.useState(false);
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [loadingAvatar, controlAvatarLoading] = React.useState(false);
  const [loadingCoverphoto, controlCoverphotoLoading] = React.useState(false);
  const [loadingName, controlNameLoading] = React.useState(false);
  const [loadingBio, controlBioLoading] = React.useState(false);
  const { profile_state } = React.useContext(ProfileContext);
  const { theme_state } = React.useContext(ThemeContext);

  const profileDocumentID = profile_state.currentUserDetails.map((profile) => {
    return profile.$id;
  })[0];

  const handle_name_change = (e) => {
    setName(e.target.value);
  };

  const handle_bio_change = (e) => {
    setBio(e.target.value);
  };

  const handle_coverphoto_change = (e) => {
    setCoverphotoPreview(URL.createObjectURL(e.target.files[0]));
    setCoverphoto(e.target.files[0]);
    setCoverphotoSelected(true);
  };
  const handle_user_img_change = (e) => {
    setUser_imgPreview(URL.createObjectURL(e.target.files[0]));
    setUser_img(e.target.files[0]);
    setUserImgSelected(true);
  };

  const uploadCoverPhoto = async () => {
    try {
      const response = await storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        uuidv4(),
        coverphoto
      );
      const fileId = response.$id;
      const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${fileId}/view?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}&mode=admin`;

      return fileURL;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadAvatar = async () => {
    try {
      const response = await storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        uuidv4(),
        user_img
      );
      const fileId = response.$id;
      const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${fileId}/view?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}&mode=admin`;

      return fileURL;
    } catch (err) {
      console.log(err);
    }
  };

  const updateCoverphoto = async () => {
    controlCoverphotoLoading(true);

    const promise = databases.updateDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_PROFILE_COLLECTION_ID,
      profileDocumentID,
      {
        coverphoto: await uploadCoverPhoto(),
      }
    );

    promise.then(
      function (response) {
        console.log(response);
        controlCoverphotoLoading(false);
        alert("CoverPhoto Updated");
      },
      function (error) {
        console.log(error);
        controlCoverphotoLoading(false);
      }
    );
  };

  const updateAvatar = async () => {
    controlAvatarLoading(true);
    const promise = databases.updateDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_PROFILE_COLLECTION_ID,
      profileDocumentID,
      {
        avatar: await uploadAvatar(),
      }
    );

    promise.then(
      function (response) {
        console.log(response);
        controlAvatarLoading(false);
        alert("Avatar Updated");
      },
      function (error) {
        console.log(error);
        controlAvatarLoading(false);
      }
    );
  };

  const updateName = () => {
    if (name === "") {
      alert("Name must not be empty");
    } else {
      controlNameLoading(true);
      const promise = databases.updateDocument(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID,
        profileDocumentID,
        {
          name: name,
        }
      );

      promise.then(
        function (response) {
          console.log(response);
          controlNameLoading(false);
          alert("Name Updated");
        },
        function (error) {
          console.log(error);
          controlNameLoading(false);
        }
      );
    }
  };

  const updateBio = () => {
    if (bio == "") {
      alert("Your bio must not be empty");
    } else {
      controlBioLoading(true);
      const promise = databases.updateDocument(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID,
        profileDocumentID,
        {
          bio: bio,
        }
      );

      promise.then(
        function (response) {
          console.log(response);
          controlBioLoading(false);
          alert("Bio Updated");
        },
        function (error) {
          console.log(error);
          controlBioLoading(false);
        }
      );
    }
  };

  return (
    <MainContainer style={{ backgroundColor: theme_state.background }}>
      <Fade bottom duration={900} distance="40px">
        <ContentConatainer>
          {profile_state.profile.map((profile) => (
            <ProfileContainer>
              <CoverPhoto
                src={
                  coverphoto_selected ? coverphotoPreview : profile.coverphoto
                }
              />
              <label style={{ alignSelf: "flex-end", marginRight: 10 }}>
                <FileInput
                  type="file"
                  onChange={handle_coverphoto_change}
                  accept="image/x-png,image/jpeg,image/jpg"
                />
                <Icon.Camera
                  color={theme_state.color}
                  style={{ cursor: "pointer" }}
                />
              </label>
              <label style={{ alignSelf: "flex-end", marginTop: 10 }}>
                {coverphoto_selected ? (
                  !loadingCoverphoto ? (
                    <Icon.CheckCircle
                      style={{ marginRight: 10, cursor: "pointer" }}
                      color={theme_state.color}
                      onClick={updateCoverphoto}
                    />
                  ) : (
                    <div style={{ fontWeight: "bold", color: "#ffff" }}>
                      Loading...
                    </div>
                  )
                ) : null}
              </label>
              <UserImg
                src={user_img_selected ? user_imgPreview : profile.avatar}
              />
              <label style={{ alignSelf: "center", marginTop: -10 }}>
                <FileInput
                  type="file"
                  onChange={handle_user_img_change}
                  accept="image/x-png,image/jpeg,image/jpg"
                />
                <Icon.Camera
                  color={theme_state.color}
                  style={{ cursor: "pointer" }}
                />
              </label>
              <label style={{ alignSelf: "center", marginTop: 10 }}>
                {!user_img_selected ? null : !loadingAvatar ? (
                  <Icon.CheckCircle
                    color={theme_state.color}
                    style={{ cursor: "pointer" }}
                    onClick={updateAvatar}
                  />
                ) : (
                  <div style={{ color: theme_state.color }}>Loading...</div>
                )}
              </label>

              <InputContainer>
                <NameInput
                  placeholder={profile.name}
                  className="form-control"
                  onChange={handle_name_change}
                  value={name}
                />
                {!loadingName ? (
                  <Icon.CheckCircle
                    onClick={updateName}
                    style={{ marginTop: 20, marginLeft: 10, cursor: "pointer" }}
                    color={theme_state.color}
                  />
                ) : (
                  <div style={{ color: theme_state.color }}>Loading...</div>
                )}
              </InputContainer>

              <BioInputContainer>
                <BioInput
                  placeholder={profile.bio}
                  className="form-control"
                  onChange={handle_bio_change}
                  value={bio}
                />
                {!loadingBio ? (
                  <Icon.CheckCircle
                    onClick={() => updateBio()}
                    style={{ marginTop: 20, marginLeft: 10, cursor: "pointer" }}
                    color={theme_state.color}
                  />
                ) : (
                  <div style={{ color: theme_state.color }}>Loading...</div>
                )}
              </BioInputContainer>
            </ProfileContainer>
          ))}
        </ContentConatainer>
      </Fade>
    </MainContainer>
  );
};

export default EditProfile;
