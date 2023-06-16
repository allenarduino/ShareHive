import React from "react";
import * as Icon from "react-feather";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

import { Link } from "react-router-dom";

import {
  NavOptionContainer,
  NavOptionItem,
  SideNavContainer,
  LogoutButton,
} from "./styles";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { account } from "../../appwrite/appwriteConfig";
import { useHistory, useLocation } from "react-router-dom";

export const SideNav = () => {
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_dispatch } = React.useContext(AuthContext);
  const [loading, controlLoading] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  const logout = async () => {
    try {
      controlLoading(true);
      await account.deleteSessions();
      auth_dispatch({ type: "LOGOUT" });
      controlLoading(false);
      history.push("/login");
    } catch (err) {
      console.log(err);
      controlLoading(false);
    }
  };

  return (
    <>
      <SideNavContainer>
        <NavOptionContainer
          onClick={() => history.push("/")}
          style={{
            borderBottom: `1px solid ${theme_state.border}`,
          }}
        >
          {" "}
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <NavOptionItem
              style={{
                color: theme_state.color,
              }}
            >
              <Icon.Home
                size={25}
                style={{
                  marginRight: 30,
                }}
              />
              Home
            </NavOptionItem>
          </Link>
        </NavOptionContainer>

        <NavOptionContainer
          onClick={() => history.push("/profile")}
          style={{
            borderBottom: `1px solid ${theme_state.border}`,
          }}
        >
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <NavOptionItem
              style={{
                color: theme_state.color,
              }}
            >
              <Icon.User size={25} style={{ marginRight: 30 }} />
              Profile
            </NavOptionItem>
          </Link>
        </NavOptionContainer>

        <LogoutButton onClick={() => logout()}>
          {loading ? "Loading..." : "Logout"}
        </LogoutButton>
      </SideNavContainer>
    </>
  );
};
