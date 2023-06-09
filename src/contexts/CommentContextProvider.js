import React from "react";
import { commentReducer } from "../reducers/CommentReducer";

export const CommentContext = React.createContext();
const initialState = {
  comments: []
};

const CommentContextProvider = props => {
  const [comment_state, comment_dispatch] = React.useReducer(
    commentReducer,
    initialState
  );

  return (
    <CommentContext.Provider value={{ comment_state, comment_dispatch }}>
      {props.children}
    </CommentContext.Provider>
  );
};
export default CommentContextProvider;
