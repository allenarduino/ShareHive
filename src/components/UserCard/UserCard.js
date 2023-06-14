import React from "react";
import { UserCardContainer, Avatar } from "./styles";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContextProvider";

export const UserCard = () => {
  const { profile_state } = React.useContext(ProfileContext);
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <UserCardContainer>
      {profile_state.currentUserDetails.map((user) => (
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
