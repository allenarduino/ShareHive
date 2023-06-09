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
  Line4
} from "./styles";

//Material UI animation  for pulsating heart
const useStyles = makeStyles(theme => ({
  like: {
    animation: "$like-button-animation 0.45s",
    animationTimingFunction: "ease-in-out",
    transform: "scale(1)"
  },
  liked: {
    animation: "$liked-button-animation 0.45s",
    animationTimingFunction: "ease-in-out",
    transform: "scale(1)"
  },
  "@keyframes like-button-animation": {
    "0%": { transform: "scale(1)" },
    "25%": { transform: "scale(1.2)" },
    "50%": { transform: "scale(0.95)" },
    "100%": { transform: "scale(1)" }
  },
  "@keyframes liked-button-animation": {
    "0%": { transform: "scale(1)" },
    "25%": { transform: "scale(1.2)" },
    "50%": { transform: "scale(0.95)" },
    "100%": { transform: "scale(1)" }
  }
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
  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

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

  const like = id => {
    const newPost = post_state.posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );

    //For user profile posts
    const newProfilePost = profile_state.user_posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
    profile_dispatch({ type: "FETCH_USER_POSTS", payload: newProfilePost });

    //Sending like details to server
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/like_post`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.log(err));
  };

  const unlike = id => {
    const newPost = post_state.posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    //For handling user profile posts
    const newProfilePost = profile_state.user_posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
    profile_dispatch({ type: "FETCH_USER_POSTS", payload: newProfilePost });

    //Sending like details to server
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/unlike_post`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: myHeaders
    }).then(res => res.json());
    // .then(data => alert(data.message));
    // .catch(err=>alert(err))
  };

  const delete_post = id => {
    if (window.confirm("Delete Post?")) {
      post_dispatch({ type: "DELETE_POST", payload: id });
      profile_dispatch({ type: "DELETE_POST", payload: id });
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const data = { post_id: id };
      fetch(`${url}/delete_post`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: myHeaders
      })
        .then(res => res.json())
        .then(data => {
          // alert(data.message);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <PostCardDesign
        style={{
          borderBottom: `1px solid ${theme_state.border}`
        }}
      >
        <UserImage
          src={post.user_img}
          onClick={() =>
            history.push("/singleprofile", {
              user_id: post.owner_id
            })
          }
        />
        <PostCardContent>
          <Line1>
            <LineBox>
              <UserName
                style={{
                  color: theme_state.color
                }}
              >
                {post.full_name}
              </UserName>
              <Date
                style={{
                  color: theme_state.typoMain
                }}
              ></Date>
            </LineBox>
            {post.owner_id == user_id ? (
              <Icon.Trash
                onClick={() => delete_post(post.p_id)}
                style={{ color: "#e3405f" }}
              />
            ) : null}
          </Line1>
          <Line2
            style={{
              color: theme_state.color
            }}
          >
            <Linkify>{post.post_caption}</Linkify>
          </Line2>

          <Line3 style={{ marginTop: 15 }}>
            {post.post_media == null ? null : post.is_video == "false" ? (
              /** <ImageModal imageUrl={`${url}/${post.post_media}`} />**/
              <img
                src={post.post_media}
                style={{ width: "100%" }}
                onClick={() =>
                  history.push("/view_image", { image: post.post_media })
                }
              />
            ) : (
              <ReactPlayer
                url={post.post_media}
                width="100%"
                height="100%"
                controls={true}
              />
            )}
          </Line3>
          <Line4
            style={{
              color: theme_state.color
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
                className={className}
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
                  is_video: post.is_video
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
