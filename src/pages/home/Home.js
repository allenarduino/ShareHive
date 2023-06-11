import React from "react";
import { PostContext } from "../../contexts/PostContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

import { Fade } from "react-reveal";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

import {
  ContentContainer,
  LeftSide,
  Avatar,
  UserCard,
  Middle,
  BodyWrapp,
  PostsColumn,
} from "./styles";
import { databases } from "../../appwrite/appwriteConfig";
import SideNav from "../../components/SideNav/SideNav";
import { RightSide } from "../../components/UserCard/UserCard";
import { Layout } from "../../layout/Layout";

const Home = () => {
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { auth_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);

  let url = auth_state.url;

  const user_id = auth_state.userID;
  const fetch_posts = async () => {
    //Just a trial
    const posts = [];

    post_dispatch({ type: "FETCH_POSTS", payload: posts });

    /*try {
      const postsPromise = databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_POST_COLLECTION_ID
      );
      const usersPromise = databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID
      );

      const [postsResponse, usersResponse] = await Promise.all([
        postsPromise,
        usersPromise,
      ]);

      const posts = postsResponse.documents.map((post) => ({
        $id: post.$id,
        userID: post.userID,
        postCaption: post.postCaption,
        postMedia: post.postMedia,
        createdAt: post.createdAt,
      }));

      const users = usersResponse.documents.reduce((acc, user) => {
        acc[user.$id] = {
          userID: user.$id,
          name: user.name,
          avatar: user.avatar,
        };
        return acc;
      }, {});

      const postsWithUsers = posts.map((post) => ({
        ...post,
        user: users[post.userID],
      }));

      console.log(postsWithUsers);
      post_dispatch({ type: "FETCH_POSTS", payload: postsWithUsers });
    } catch (error) {
      console.error("Error fetching posts and users", error);
    }*/
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
