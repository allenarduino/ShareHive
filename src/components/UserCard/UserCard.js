import React from "react";
import { UserCardContainer, Avatar } from "./styles";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { Link } from "react-router-dom";
import { PostContext } from "../../contexts/PostContextProvider";

export const UserCard = () => {
  const { post_state } = React.useContext(PostContext);
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <UserCardContainer>
      {post_state.user.map((user) => (
        <>
          <Link to="/profile">
            {" "}
            <Avatar src={`${user.avatar}`} />
          </Link>
          <b style={{ color: theme_state.color }}>{user.name}</b>
        </>
      ))}
    </UserCardContainer>
  );
};
