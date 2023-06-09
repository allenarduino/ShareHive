import React from "react";
import { postReducer } from "../reducers/PostReducer";

export const PostContext = React.createContext();
const initialState = {
  posts: [],
  user: [],
  post_sending: false
};

const PostContextProvider = props => {
  const [post_state, post_dispatch] = React.useReducer(
    postReducer,
    initialState
  );

  return (
    <PostContext.Provider value={{ post_state, post_dispatch }}>
      {props.children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
