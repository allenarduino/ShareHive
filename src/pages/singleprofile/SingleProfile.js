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
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  const { post_dispatch } = React.useContext(PostContext);
  const { theme_state } = React.useContext(ThemeContext);

  const user_id = location.state.user_id;

  const fetch_user = async () => {
    try {
      // Fetch user profile posts
      const postsResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_POST_COLLECTION_ID,
        [Query.equal("userID", user_id)],
        [Query.orderDesc("$createdAt")]
      );

      //Fetch current user info.
      const userResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID,
        [Query.equal("userID", user_id)]
      );
      console.log(userResponse);
      post_dispatch({ type: "FETCH_USER", payload: userResponse.documents });
      profile_dispatch({
        type: "FETCH_PROFILE",
        payload: userResponse.documents,
      });

      //Merge and group the posts and users
      const mergePostsAndUsers = (posts, users) => {
        return posts.documents.map((post) => {
          const user = users.documents.find(
            (user) => user.userID === post.userID
          );
          return { ...post, ...user };
        });
      };

      const mergedData = mergePostsAndUsers(postsResponse, userResponse);
      console.log(mergedData);
      profile_dispatch({ type: "FETCH_PROFILE_POSTS", payload: mergedData });
    } catch (error) {
      console.error("Error fetching posts and users", error);
    }
  };
  React.useEffect(() => {
    fetch_user();
  }, [profile_state.profile]);

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
              <EditProfileButton onClick={() => history.push("/editprofile")}>
                Edit Profile
              </EditProfileButton>
            </ProfileContainer>
          </Fade>
        ))
      )}

      {profile_state.profilePosts.length === 0 ? (
        <Loader />
      ) : (
        profile_state.profilePosts.map((post) => (
          <Fade bottom duration={900} distance="40px">
            <PostCard post={post} />
          </Fade>
        ))
      )}
    </>
  );
};
export default SingleProfile;
