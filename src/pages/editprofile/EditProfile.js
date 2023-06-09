import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import jwt_decode from "jwt-decode";
import { Fade } from "react-reveal";
import * as Icon from "react-feather";
import {
  MainContainer,
  ContentConatainer,
  ProfileContainer,
  CoverPhoto,
  UserImg,
  NameInput,
  BioInput,
  SaveButton,
  FileInput,
  InputContainer,
  BioInputContainer
} from "./styles";

const EditProfile = () => {
  const [user_img, setUser_img] = React.useState(null);
  const [coverphoto, setCoverphoto] = React.useState(null);
  const [user_imgPreview, setUser_imgPreview] = React.useState(null);
  const [coverphotoPreview, setCoverphotoPreview] = React.useState(null);
  const [coverphoto_selected, setCoverphotoSelected] = React.useState(false);
  const [user_img_selected, setUserImgSelected] = React.useState(false);
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [loadingUser_img, controlUserImageLoading] = React.useState(false);
  const [loadingCoverphoto, controlCoverphotoLoading] = React.useState(false);
  const [loadingName, controlNameLoading] = React.useState(false);
  const [loadingBio, controlBioLoading] = React.useState(false);
  const { auth_state } = React.useContext(AuthContext);
  const { profile_state } = React.useContext(ProfileContext);
  const { theme_state } = React.useContext(ThemeContext);
  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const handle_name_change = e => {
    setName(e.target.value);
  };

  const handle_bio_change = e => {
    setBio(e.target.value);
  };

  const handle_coverphoto_change = e => {
    setCoverphotoPreview(URL.createObjectURL(e.target.files[0]));
    setCoverphoto(e.target.files[0]);
    setCoverphotoSelected(true);
  };
  const handle_user_img_change = e => {
    setUser_imgPreview(URL.createObjectURL(e.target.files[0]));
    setUser_img(e.target.files[0]);
    setUserImgSelected(true);
  };

  const update_coverphoto = () => {
    controlCoverphotoLoading(true);

    const data = new FormData();
    data.append("coverphoto", coverphoto);

    let myHeaders = new Headers();
    myHeaders.append(
      "x-access-token",
      auth_state.token || localStorage.getItem("token")
    );
    fetch(`${url}/update_coverphoto`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlCoverphotoLoading(false);
        alert("Coverphoto updated");
      })
      .catch(err => {
        controlCoverphotoLoading(false);
        alert(err);
      });
  };

  const update_user_img = () => {
    controlUserImageLoading(true);

    const data = new FormData();
    data.append("user_img", user_img);

    let myHeaders = new Headers();
    myHeaders.append(
      "x-access-token",
      auth_state.token || localStorage.getItem("token")
    );
    fetch(`${url}/update_user_img`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlUserImageLoading(false);

        alert("Profile Photo Updated");
      })
      .catch(err => {
        controlUserImageLoading(false);
        alert(err);
      });
  };

  const update_name = () => {
    if (name == "") {
      alert("Name must not be empty");
    } else {
      controlNameLoading(true);
      const myHeaders = new Headers();
      myHeaders.append(
        "x-access-token",
        auth_state.token || localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      fetch(`${url}/update_name`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ name: name })
      })
        .then(res => res.json())
        .then(data => {
          controlNameLoading(false);
          alert(data.message);
        })
        .catch(err => {
          console.log(err);
          controlNameLoading(false);
        });
    }
  };

  const update_bio = () => {
    if (bio == "") {
      alert("Your bio must not be empty");
    } else {
      controlBioLoading(true);
      const myHeaders = new Headers();
      myHeaders.append(
        "x-access-token",
        auth_state.token || localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      fetch(`${url}/update_bio`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ bio: bio })
      })
        .then(res => res.json())
        .then(data => {
          controlBioLoading(false);
          alert(data.message);
        })
        .catch(err => {
          console.log(err);
          controlBioLoading(false);
        });
    }
  };

  return (
    <MainContainer style={{ backgroundColor: theme_state.background }}>
      <Fade bottom duration={900} distance="40px">
        <ContentConatainer>
          {profile_state.profile.map(profile => (
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
                <Icon.Camera color={theme_state.color} />
              </label>
              <label style={{ alignSelf: "flex-end", marginTop: 10 }}>
                {coverphoto_selected ? (
                  !loadingCoverphoto ? (
                    <Icon.CheckCircle
                      style={{ marginRight: 10 }}
                      color={theme_state.color}
                      onClick={() => update_coverphoto()}
                    />
                  ) : (
                    <div>Loading...</div>
                  )
                ) : null}
              </label>
              <UserImg
                src={user_img_selected ? user_imgPreview : profile.user_img}
              />
              <label style={{ alignSelf: "center", marginTop: -10 }}>
                <FileInput
                  type="file"
                  onChange={handle_user_img_change}
                  accept="image/x-png,image/jpeg,image/jpg"
                />
                <Icon.Camera color={theme_state.color} />
              </label>
              <label style={{ alignSelf: "center", marginTop: 10 }}>
                {!user_img_selected ? null : !loadingUser_img ? (
                  <Icon.CheckCircle
                    color={theme_state.color}
                    onClick={() => update_user_img()}
                  />
                ) : (
                  <div style={{ color: theme_state.color }}>Loading...</div>
                )}
              </label>

              <InputContainer>
                <NameInput
                  placeholder={profile.full_name}
                  className="form-control"
                  onChange={handle_name_change}
                  value={name}
                />
                {!loadingName ? (
                  <Icon.CheckCircle
                    onClick={() => update_name()}
                    style={{ marginTop: 20, marginLeft: 10 }}
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
                    onClick={() => update_bio()}
                    style={{ marginTop: 20, marginLeft: 10 }}
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
