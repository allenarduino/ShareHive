import React from "react";
import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { v4 as uuidv4 } from "uuid";
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
  Spacer,
} from "./styles";
import { account, databases, storage } from "../../appwrite/appwriteConfig";

const PostImage = () => {
  const history = useHistory();
  const { media_state } = React.useContext(SelectMediaContext);
  const { theme_state } = React.useContext(ThemeContext);
  const [postCaption, setPostCaption] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const getUserID = async () => {
    try {
      let response = await account.get();
      return response.$id;
    } catch (err) {
      console.log(err);
    }
  };

  const handle_post_caption_change = (e) => {
    setPostCaption(e.target.value);
  };

  const uploadImage = async () => {
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
        postMedia: await uploadImage(),
        isVideo: false,
        userID: await getUserID(),
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
