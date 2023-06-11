import React from "react";
import { UserCardContainer, Avatar } from "./styles";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { Link } from "react-router-dom";

export const UserCard = (user) => {
  const { post_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <UserCardContainer>
      <Link to="/profile">
        {" "}
        <Avatar src={`/${user.user_img}`} />
      </Link>
      <b style={{ color: theme_state.color }}>{user.full_name}</b>
    </UserCardContainer>
  );
};
