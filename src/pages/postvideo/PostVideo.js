import React from "react";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as Icon from "react-feather";
import {
  CenterInput,
  InputField,
  SubmitButton,
  Header,
  HeaderRight,
  Spacer,
} from "./styles";
import { databases, storage } from "../../appwrite/appwriteConfig";

const PostVideo = () => {
  const history = useHistory();
  const { media_state } = React.useContext(SelectMediaContext);
  const { auth_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);
  const [postCaption, setPostCaption] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_post_caption_change = (e) => {
    setPostCaption(e.target.value);
  };

  const uploadVideo = async () => {
    try {
      const response = await storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        uuidv4(),
        media_state.post_media
      );
      const fileId = response.$id;
      const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${fileId}/view?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}&mode=admin`;

      return fileURL;
    } catch (err) {
      console.log(err);
    }
  };

  const create_post = async () => {
    controlLoading(true);
    const promise = databases.createDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_POST_COLLECTION_ID,
      uuidv4(),
      {
        postID: uuidv4(),
        postCaption: postCaption,
        postMedia: await uploadVideo(),
        type: "video",
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
          placeholder="Add Caption"
          onChange={handle_post_caption_change}
          type="text"
          value={postCaption}
          name="post_caption"
          style={{
            backgroundColor: theme_state.background,
            color: theme_state.color,
          }}
        />
        <div style={{ height: 200 }}>
          <ReactPlayer
            url={media_state.mediaPreview}
            style={{ top: 0 }}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
        <div style={{ alignSelf: "center" }}>
          {loading ? (
            <SubmitButton>loading...</SubmitButton>
          ) : (
            <SubmitButton onClick={() => create_post()}>Submit</SubmitButton>
          )}
        </div>
      </CenterInput>
    </div>
  );
};

export default PostVideo;
