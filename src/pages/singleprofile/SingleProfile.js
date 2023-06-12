import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import { Fade } from "react-reveal";

import {
  ProfileContainer,
  CoverPhoto,
  UserImg,
  FullName,
  Bio,
  EditProfileButton,
} from "./styles";
import { databases } from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { PostContext } from "../../contexts/PostContextProvider";

const SingleProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const { auth_state } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { theme_state } = React.useContext(ThemeContext);

  let user_id = location.state.user_id;

  const fetch_user = async () => {
    try {
      const usersResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID,
        [Query.equal("userID", user_id)]
      );
      console.log(usersResponse);
      console.log(user_id);
      profile_dispatch({
        type: "FETCH_PROFILE",
        payload: usersResponse.documents,
      });

      post_dispatch({ type: "FETCH_USER", payload: usersResponse.documents });

      //Fetch posts
      const postsResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_POST_COLLECTION_ID,
        [Query.equal("userID", user_id)]
      );

      const posts = postsResponse.documents.map((post) => ({
        $id: post.$id,
        userID: post.userID,
        postCaption: post.postCaption,
        postMedia: post.postMedia,
        createdAt: post.createdAt,
      }));

      const userIds = [...new Set(posts.map((post) => post.userID))];
      const users = usersResponse.documents.reduce((acc, user) => {
        acc[user.userID] = {
          name: user.name,
          avatar: user.avatar,
          coverphoto: user.coverphoto,
        };
        return acc;
      }, {});

      // Merge posts and users
      const postsWithUsers = posts.map((post) => ({
        ...post,
        name: users[post.userID].name,
        avatar: users[post.userID].avatar,
        user: [
          {
            userID: post.userID,
            name: users[post.userID].name,
            avatar: users[post.userID].avatar,
          },
        ],
      }));

      post_dispatch({ type: "FETCH_POSTS", payload: postsWithUsers });
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetch_user();
  }, []);

  return (
    <>
      {profile_state.profile.length == 0 ? (
        <Loader />
      ) : (
        profile_state.profile.map((profile) => (
          <Fade bottom duration={900} distance="40px">
            <ProfileContainer>
              <CoverPhoto src={profile.coverphoto} />
              <UserImg src={profile.avatar} />
              <FullName style={{ color: theme_state.color }}>
                {profile.name}
              </FullName>
              <Bio style={{ color: theme_state.color }}>{profile.bio}</Bio>
              {user_id == profile.userID ? (
                <EditProfileButton onClick={() => history.push("/editprofile")}>
                  Edit Profile
                </EditProfileButton>
              ) : (
                <EditProfileButton
                  onClick={() => window.open(profile.email, "_blank")}
                >
                  Send Email
                </EditProfileButton>
              )}
            </ProfileContainer>
          </Fade>
        ))
      )}

      {post_state.posts.length == 0 ? (
        <Loader />
      ) : (
        post_state.posts.map((post) => (
          <Fade bottom duration={900} distance="40px">
            <PostCard post={post} />
          </Fade>
        ))
      )}
    </>
  );
};
export default SingleProfile;
