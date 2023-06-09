import React from "react";
import Linkify from "react-linkify";
import * as Icon from "react-feather";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  CommentCardDesign,
  UserImage,
  Content,
  Line1,
  Line1Box,
  UserName,
  Line2,
  Line2Box,
  Line2Text,
  Line2AuthorName,
  Line2Content
} from "./styles";

import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { CommentContext } from "../../contexts/CommentContextProvider";

const CommentCard = ({ comment }) => {
  const history = useHistory();
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  const { comment_dispatch } = React.useContext(CommentContext);

  let url = auth_state.url;
  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const delete_comment = id => {
    if (window.confirm("Delete Comment?")) {
      comment_dispatch({ type: "DELETE_COMMENT", payload: id });
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const data = { comment_id: id };
      fetch(`${url}/delete_comment`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: myHeaders
      })
        .then(res => res.json())
        .then(data => {
          // alert(data.message);
        })
        .catch(err => alert(err));
    }
  };

  return (
    <CommentCardDesign
      style={{
        borderBottom: `1px solid ${theme_state.border}`
      }}
    >
      <UserImage
        src={comment.user_img}
        onClick={() => {
          history.push("/singleprofile", {
            user_id: comment.user_id
          });
        }}
      />
      <Content>
        <Line1>
          <Line1Box>
            <UserName
              style={{
                color: theme_state.color
              }}
            >
              {comment.full_name}
            </UserName>
          </Line1Box>
          {comment.user_id == user_id ? (
            <Icon.Trash
              onClick={() => delete_comment(comment.id)}
              size={17}
              style={{ color: theme_state.color }}
            />
          ) : null}
        </Line1>
        <Line2>
          <Line2Box
            style={{
              color: theme_state.typoSecondary
            }}
          >
            <Line2Text>
              Replying to
              <span
                onClick={() => {
                  history.push("/singleprofile", {
                    user_id: comment.user_id
                  });
                }}
                style={{
                  color: theme_state.mainColor
                }}
              >
                <Line2AuthorName>
                  {"@"}
                  {comment.full_name}
                </Line2AuthorName>
              </span>
            </Line2Text>
          </Line2Box>
          <Line2Content
            style={{
              color: theme_state.color
            }}
          >
            <Linkify>{comment.text}</Linkify>
          </Line2Content>
        </Line2>
      </Content>
    </CommentCardDesign>
  );
};

export default CommentCard;
