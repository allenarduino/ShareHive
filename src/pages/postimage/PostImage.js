import React from "react";
import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import {
  MyImage,
  CenterInput,
  InputField,
  SubmitButton,
  Header,
  HeaderRight,
  Spacer
} from "./styles";

const PostImage = () => {
  const history = useHistory();
  const { media_state } = React.useContext(SelectMediaContext);
  const { auth_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);
  const [post_caption, setPostCaption] = React.useState("");
  const [loading, controlLoading] = React.useState(false);
  let url = auth_state.url;

  const handle_post_caption_change = e => {
    setPostCaption(e.target.value);
  };
  const create_post = () => {
    controlLoading(true);
    const data = new FormData();
    data.append("post_caption", post_caption);
    data.append("post_media", media_state.post_media);
    data.append("is_video", false);
    let myHeaders = new Headers();
    myHeaders.append(
      "x-access-token",
      auth_state.token || localStorage.getItem("token")
    );
    fetch(`${url}/post_image`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlLoading(false);
        //alert(data.message);
        history.push("/");
      })
      .catch(err => {
        controlLoading(false);
        alert(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        backgroundColor: theme_state.background
      }}
    >
      <Header style={{ backgroundColor: theme_state.background }}>
        <Icon.Delete
          onClick={() => history.goBack()}
          style={{ color: theme_state.color }}
          size={25}
        />
        <Spacer></Spacer>
        <HeaderRight>
          {loading ? (
            <b style={{ color: theme_state.color }}>Sending...</b>
          ) : (
            <Icon.CheckCircle
              onClick={() => create_post()}
              style={{ color: theme_state.color }}
              size={25}
            />
          )}
        </HeaderRight>
      </Header>

      <CenterInput>
        <InputField
          placeholder="Add Caption"
          onChange={handle_post_caption_change}
          type="text"
          value={post_caption}
          name="post_caption"
          style={{
            backgroundColor: theme_state.background,
            color: theme_state.color
          }}
        />
        <MyImage src={media_state.mediaPreview} />
        {loading ? (
          <SubmitButton>Loading...</SubmitButton>
        ) : (
          <SubmitButton onClick={() => create_post()}>Submit</SubmitButton>
        )}
      </CenterInput>
    </div>
  );
};

export default PostImage;
