import React from "react";
import Linkify from "react-linkify";
import jwt_decode from "jwt-decode";
import * as Icon from "react-feather";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { PostContext } from "../../contexts/PostContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";

import {
  UserImage,
  PostCardContent,
  Line1,
  Line2,
  UserName,
  Date,
  LineBox,
  PostCardDesign,
  Line3,
  Line4,
} from "./styles";
import { databases } from "../../appwrite/appwriteConfig";

//Material UI animation  for pulsating heart
const useStyles = makeStyles((theme) => ({
  like: {
    animation: "$like-button-animation 0.45s",
    animationTimingFunction: "ease-in-out",
    transform: "scale(1)",
  },
  liked: {
    animation: "$liked-button-animation 0.45s",
    animationTimingFunction: "ease-in-out",
    transform: "scale(1)",
  },
  "@keyframes like-button-animation": {
    "0%": { transform: "scale(1)" },
    "25%": { transform: "scale(1.2)" },
    "50%": { transform: "scale(0.95)" },
    "100%": { transform: "scale(1)" },
  },
  "@keyframes liked-button-animation": {
    "0%": { transform: "scale(1)" },
    "25%": { transform: "scale(1.2)" },
    "50%": { transform: "scale(0.95)" },
    "100%": { transform: "scale(1)" },
  },
}));

const PostCard = ({ post }) => {
  const history = useHistory();
  const classes = useStyles();
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);

  //For handling heart animation
  const [pulse, setPulse] = React.useState(false);

  //For heart pulse animation
  function handleLike() {
    setPulse(true);
  }

  function handleUnlike() {
    setPulse(false);
  }

  //For heart pulse animation
  const className = pulse ? classes.liked : classes.like;
  const onClick = pulse ? handleUnlike : handleLike;

  const like = (id) => {
    const newPost = post_state.posts.map((p) =>
      p.p_id === id
        ? {
            ...p,
            post_liker: auth_state.user_id,
            total_likes: p.total_likes + 1,
          }
        : p
    );

    //For user profile posts
    const newProfilePost = profile_state.user_posts.map((p) =>
      p.p_id === id
        ? {
            ...p,
            post_liker: auth_state.user_id,
            total_likes: p.total_likes + 1,
          }
        : p
    );

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
    profile_dispatch({ type: "FETCH_USER_POSTS", payload: newProfilePost });

    //Sending like details to server
  };

  const unlike = (id) => {
    const newPost = post_state.posts.map((p) =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    //For handling user profile posts
    const newProfilePost = profile_state.user_posts.map((p) =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
    profile_dispatch({ type: "FETCH_USER_POSTS", payload: newProfilePost });

    //Sending like details to server
  };

  const delete_post = (id) => {
    if (window.confirm("Delete Post?")) {
      try {
        post_dispatch({ type: "DELETE_POST", payload: id });
        const response = databases.deleteDocument(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_POST_COLLECTION_ID,
          id
        );
        console.log(response);
      } catch (err) {
        console.log(id);
      }
    }
  };

  return (
    <div>
      <PostCardDesign
        style={{
          borderBottom: `1px solid ${theme_state.border}`,
        }}
      >
        <UserImage
          src={post.avatar}
          onClick={() =>
            history.push("/singleprofile", {
              user_id: post.userID,
            })
          }
        />
        <PostCardContent>
          <Line1>
            <LineBox>
              <UserName
                style={{
                  color: theme_state.color,
                }}
              >
                {post.name}
              </UserName>
              <Date
                style={{
                  color: theme_state.typoMain,
                }}
              ></Date>
            </LineBox>
            {post.userID == auth_state.userID ? (
              <Icon.Trash
                onClick={() => delete_post(post.$id)}
                style={{ color: "#e3405f" }}
              />
            ) : null}
          </Line1>
          <Line2
            style={{
              color: theme_state.color,
            }}
          >
            <Linkify>{post.postCaption}</Linkify>
          </Line2>

          <Line3 style={{ marginTop: 15 }}>
            {post.type === "image" && (
              <img src={post.postMedia} style={{ width: "100%" }} />
            )}

            {post.type === "video" && (
              <ReactPlayer
                url={post.postMedia}
                width="100%"
                height="100%"
                controls={true}
              />
            )}
          </Line3>
          <Line4
            style={{
              color: theme_state.color,
            }}
          >
            {post.post_liker == null ? (
              <Icon.Heart
                color={theme_state.color}
                onClick={() => {
                  like(post.p_id);
                  onClick();
                }}
                className={className}
              />
            ) : (
              <Icon.Heart
                color="red"
                className={pulse ? "heart" : "null"}
                fill="red"
                // className={className}
                onClick={() => {
                  unlike(post.p_id);
                  onClick();
                }}
              />
            )}
            <b style={{ fontSize: 18 }}>{post.total_likes}</b>
            <Icon.MessageCircle
              onClick={() =>
                history.push("/comment_page", {
                  post_media: post.post_media,
                  post_id: post.p_id,
                  is_video: post.is_video,
                })
              }
            />
            <b style={{ fontSize: 18 }}>{post.total_comments}</b>
          </Line4>
        </PostCardContent>
      </PostCardDesign>
    </div>
  );
};

export default PostCard;
