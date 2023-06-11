import React from "react";
import * as Icon from "react-feather";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

import { Link } from "react-router-dom";

import { NavOptionContainer, NavOptionItem, SideNavContainer } from "./styles";

export const SideNav = () => {
  const { theme_state } = React.useContext(ThemeContext);

  return (
    <>
      <SideNavContainer>
        <NavOptionContainer
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
            <NavOptionItem style={{ color: theme_state.color }}>
              <Icon.Home size={25} style={{ marginRight: 30 }} />
              Home
            </NavOptionItem>
          </Link>
        </NavOptionContainer>

        <NavOptionContainer
          style={{
            borderBottom: `1px solid ${theme_state.border}`,
          }}
        >
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <NavOptionItem style={{ color: theme_state.color }}>
              <Icon.User size={25} style={{ marginRight: 30 }} />
              Profile
            </NavOptionItem>
          </Link>
        </NavOptionContainer>
      </SideNavContainer>
    </>
  );
};
