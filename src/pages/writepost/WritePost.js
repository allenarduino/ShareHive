import React from "react";
import * as Icon from "react-feather";
import { v4 as uuidv4 } from "uuid";
import {
  CenterInput,
  InputField,
  SubmitButton,
  Header,
  HeaderRight,
  Spacer,
} from "./styles";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { databases } from "../../appwrite/appwriteConfig";

const WritePost = () => {
  const history = useHistory();

  const { auth_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);
  const [postCaption, setPostCaption] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_post_caption_change = (e) => {
    setPostCaption(e.target.value);
  };
  const create_post = () => {
    if (postCaption == "") {
      alert("Please never leave the form empty");
    } else {
      controlLoading(true);
      const promise = databases.createDocument(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_POST_COLLECTION_ID,
        uuidv4(),
        {
          postID: uuidv4(),
          postCaption: postCaption,
          userID: auth_state.userID,
        }
      );

      promise.then(
        function (response) {
          console.log(response);
          controlLoading(false);
          history.push("/");
        },
        function (error) {
          console.log(error);
          controlLoading(false);
        }
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        backgroundColor: theme_state.background,
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
          placeholder="Share your thoughts and experiences with people..."
          onChange={handle_post_caption_change}
          type="text"
          autoFocus
          value={postCaption}
          name="post_caption"
          style={{
            backgroundColor: theme_state.background,
            color: theme_state.color,
          }}
        />

        {loading ? (
          <SubmitButton>Loading...</SubmitButton>
        ) : (
          <SubmitButton onClick={() => create_post()}>Submit</SubmitButton>
        )}
      </CenterInput>
    </div>
  );
};

export default WritePost;
