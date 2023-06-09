import React from "react";
import * as Icon from "react-feather";
import jwt_decode from "jwt-decode";
import { useLocation, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import {
  BackArrowContainer,
  CommentContainer,
  CommentBackground,
  CommentInputContainer,
  CommentInput,
  EmptyCommentFeedBack
} from "./styles";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { PostContext } from "../../contexts/PostContextProvider";
import { CommentContext } from "../../contexts/CommentContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import CommentCard from "../../components/CommentCard/CommentCard";
import Loader from "../../components/Loader/Loader";
const { v4: uuidv4 } = require("uuid");

//This modal is for Desktop Devices
const CommentPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { post_state } = React.useContext(PostContext);
  const { comment_state, comment_dispatch } = React.useContext(CommentContext);
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;
  const [comment_text, setComment] = React.useState("");
  const [empty_comment, setEmptyComment] = React.useState(false);
  const [loading, controlLoading] = React.useState(true);

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  //For scrolling when new comment is added
  const commentsEndRef = React.useRef(null);

  const scrollToTop = () => {
    commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  //For fetching user_img  and name in context to use it offline
  const user_img = post_state.user.map(user => {
    return user.user_img;
  });
  const full_name = post_state.user.map(user => {
    return user.full_name;
  });

  //Fetching  the comments from server
  const fetch_comments = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/fetch_comments/${location.state.post_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        comment_dispatch({ type: "FETCH_COMMENTS", payload: data.comments });
        controlLoading(false);
      })
      .catch(err => console.log(err));
  };
  const handle_comment_change = e => {
    setComment(e.target.value);
  };

  const offline_comment = {
    text: comment_text,
    user_img: user_img,
    full_name: full_name,
    id: uuidv4(),
    user_id: user_id
  };

  const create_comment = () => {
    if (comment_text == "") {
      return;
    } else {
      comment_dispatch({ type: "ADD_COMMENT", payload: offline_comment });
      setComment("");
      scrollToTop();
      //Sending comment to the server
      let myHeaders = new Headers();
      myHeaders.append(
        "x-access-token",
        auth_state.token || localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      const data = { comment_text: comment_text };
      fetch(`${url}/create_comment/${location.state.post_id}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.comments);
          fetch_comments();
        })
        .catch(err => console.log(err));
    }
  };

  React.useEffect(() => {
    fetch_comments();
  }, []);

  return (
    <CommentBackground>
      <BackArrowContainer>
        <Icon.ArrowLeft
          color="#fff"
          size={25}
          onClick={() => history.goBack()}
        />
      </BackArrowContainer>

      <CommentContainer style={{ backgroundColor: theme_state.background }}>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div ref={commentsEndRef} />
            {comment_state.comments.length == 0 ? (
              <EmptyCommentFeedBack style={{ color: theme_state.color }}>
                Be the first to comment
              </EmptyCommentFeedBack>
            ) : null}
            {comment_state.comments.map(comment => (
              <Fade bottom duration={900} distance="40px">
                <CommentCard comment={comment} />
              </Fade>
            ))}
          </div>
        )}
        <CommentInputContainer
          style={{ backgroundColor: theme_state.background }}
        >
          <CommentInput
            type="text"
            placeholder="Write Comment"
            onChange={handle_comment_change}
          />
          <Icon.Send
            color="#e3405f"
            style={{ marginTop: 10, marginLeft: 10 }}
            onClick={() => create_comment()}
          />
        </CommentInputContainer>
      </CommentContainer>
    </CommentBackground>
  );
};
export default CommentPage;
