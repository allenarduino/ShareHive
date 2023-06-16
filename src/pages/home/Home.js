import React from "react";
import { PostContext } from "../../contexts/PostContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Fade } from "react-reveal";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";

import { databases } from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { ProfileContext } from "../../contexts/ProfileContextProvider";

const Home = () => {
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { auth_state } = React.useContext(AuthContext);
  const { profile_dispatch } = React.useContext(ProfileContext);

  const fetch_posts = async () => {
    try {
      // Fetch posts
      const postsResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_POST_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );

      // Fetch users
      const usersResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID
      );
      console.log(usersResponse);

      //Merge and group the posts and users
      const mergePostsAndUsers = (posts, users) => {
        return posts.documents.map((post) => {
          const user = users.documents.find(
            (user) => user.userID === post.userID
          );
          return { ...post, post_id: post.$id, ...user };
        });
      };

      const mergedData = mergePostsAndUsers(postsResponse, usersResponse);
      console.log(mergedData);
      post_dispatch({ type: "FETCH_POSTS", payload: mergedData });

      //Fetch current user info.
      const response = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID,
        [Query.equal("userID", auth_state.userID)]
      );
      console.log(response);
      profile_dispatch({
        type: "FETCH_CURRENT_USER",
        payload: response.documents,
      });
    } catch (error) {
      console.error("Error fetching posts and users", error);
    }
  };

  React.useEffect(() => {
    fetch_posts();
  }, []);
  return (
    <>
      {post_state.posts.length === 0 ? (
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

export default Home;
