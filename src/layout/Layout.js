import React from "react";
import {
  LayoutBackground,
  LayoutGrid,
  LeftColumn,
  MiddleColumn,
  RightColumn,
} from "./style";
import { SideNav } from "../components/SideNav/SideNav";
import { UserCard } from "../components/UserCard/UserCard";
import { ThemeContext } from "../contexts/ThemeContextProvider";

export const Layout = ({ children }) => {
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <LayoutBackground style={{ backgroundColor: theme_state.background }}>
      <LayoutGrid>
        <LeftColumn>
          <SideNav />
        </LeftColumn>
        <MiddleColumn>{children}</MiddleColumn>
        <RightColumn>
          <UserCard />
        </RightColumn>
      </LayoutGrid>
    </LayoutBackground>
  );
};
