import React from "react";
import { Header, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const CreatePostHeader = props => {
  const history = useHistory();
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <Header style={{ backgroundColor: theme_state.background }}>
      <Icon.Delete
        onClick={() => history.goBack()}
        style={{ color: theme_state.color }}
      />
      <Spacer></Spacer>
      <HeaderRight>
        <Icon.CheckCircle
          onClick={props.create_post}
          style={{ color: theme_state.color }}
        />
      </HeaderRight>
    </Header>
  );
};
export default CreatePostHeader;
