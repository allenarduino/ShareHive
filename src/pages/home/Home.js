import React from "react";
import { PostContext } from "../../contexts/PostContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Fade } from "react-reveal";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";

import { databases } from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";

const Home = () => {
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { auth_state } = React.useContext(AuthContext);

  const user_id = auth_state.userID;

  const fetch_posts = async () => {
    try {
      // Fetch posts
      const postsResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_POST_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      const posts = postsResponse.documents.map((post) => ({
        $id: post.$id,
        userID: post.userID,
        postCaption: post.postCaption,
        postMedia: post.postMedia,
        createdAt: post.createdAt,
        type: post.type,
      }));

      // Fetch users
      const userIds = [...new Set(posts.map((post) => post.userID))];
      const usersResponse = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID
      );
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

      const response = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID,
        [Query.equal("userID", user_id)]
      );
      console.log(response);
      post_dispatch({ type: "FETCH_USER", payload: response.documents });

      console.log(postsWithUsers);
      post_dispatch({ type: "FETCH_POSTS", payload: postsWithUsers });
    } catch (error) {
      console.error("Error fetching posts and users", error);
    }
  };
  React.useEffect(() => {
    fetch_posts();
  }, []);
  return (
    <>
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

export default Home;
