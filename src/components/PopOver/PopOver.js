import React from "react";
import { useHistory } from "react-router-dom";
import { PopOverContainer, OptionsContainer, FileInput } from "./styles";
import * as Icon from "react-feather";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { Fade } from "react-reveal";

const PopOver = () => {
  const history = useHistory();
  const { media_dispatch } = React.useContext(SelectMediaContext);
  const { theme_state } = React.useContext(ThemeContext);

  const handle_image_change = e => {
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
    history.push("/post_image");
  };

  const handle_video_change = e => {
    history.push("/post_video");
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
  };
  return (
    <PopOverContainer style={{ backgroundColor: theme_state.background }}>
      <Fade bottom duration={900} distance="40px">
        <label style={{ color: theme_state.color }}>
          <OptionsContainer>
            <FileInput
              type="file"
              required
              onChange={handle_image_change}
              accept="image/x-png,image/jpeg,image/jpg"
            />
            Add Photo{" "}
            <Icon.Image style={{ marginLeft: 10, color: theme_state.color }} />
          </OptionsContainer>
        </label>
        <label style={{ color: theme_state.color }}>
          <OptionsContainer>
            <FileInput
              type="file"
              required
              onChange={handle_video_change}
              accept="video/mp4,video/x-m4v,video/mp3,video/*"
            />
            Add Video <Icon.Video style={{ marginLeft: 10 }} />
          </OptionsContainer>
        </label>
      </Fade>
    </PopOverContainer>
  );
};

export default PopOver;
