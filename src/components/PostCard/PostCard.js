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

  //Function for sending postLikes details to server
  const updatePostLikes = (postLikesArray, postDocumentID) => {
    const promise = databases.updateDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_POST_COLLECTION_ID,
      postDocumentID,
      {
        postLikes: postLikesArray,
      }
    );

    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
        console.log(postDocumentID);
      }
    );
  };

  //For liking a post
  const like = (userID, postID) => {
    const newPost = post_state.posts.map((post) => {
      const postLikesArray = post.postLikes;
      if (post.post_id === postID) {
        // Add the userID to the postLikes array
        postLikesArray.push(userID);
      }
      console.log(post.$id);
      //Sending postLikes details to server
      updatePostLikes(postLikesArray, post.post_id);
      return { ...post, postLikes: postLikesArray };
    });
    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
    console.log(newPost.postLikes);
  };

  //For unliking a post
  const unlike = (userID, postID) => {
    const newPost = post_state.posts.map((post) => {
      let postLikesArray = post.postLikes;

      if (post.post_id === postID) {
        postLikesArray = post.postLikes.filter((id) => id !== userID);
        // Sending postLikes details to server
        updatePostLikes(postLikesArray, post.post_id);
        console.log(post.post_id);
      }

      return { ...post, postLikes: postLikesArray };
    });

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
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
            {post.userID === auth_state.userID ? (
              <Icon.Trash
                onClick={() => delete_post(post.post_id)}
                style={{ color: "#e3405f", cursor: "pointer" }}
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
            {!post.postLikes.includes(auth_state.userID) ? (
              <Icon.Heart
                color={theme_state.color}
                className={className}
                onClick={() => {
                  like(auth_state.userID, post.post_id);
                  onClick();
                }}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <Icon.Heart
                color="red"
                className={pulse ? "heart" : "null"}
                fill="red"
                onClick={() => {
                  unlike(auth_state.userID, post.post_id);
                  onClick();
                }}
                className={className}
                style={{ cursor: "pointer" }}
              />
            )}
            <b style={{ fontSize: 18 }}>
              {post.postLikes.length > 0 && post.postLikes.length}
            </b>

            <Icon.MessageCircle />
            <b style={{ fontSize: 18 }}>{post.total_comments}</b>
          </Line4>
        </PostCardContent>
      </PostCardDesign>
    </div>
  );
};

export default PostCard;
