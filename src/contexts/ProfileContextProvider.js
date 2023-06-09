import React from "react";
import { profileReducer } from "../reducers/ProfileReducer";

export const ProfileContext = React.createContext();
const initialState = {
  profile: [],
  user_posts: []
};

const PostContextProvider = props => {
  const [profile_state, profile_dispatch] = React.useReducer(
    profileReducer,
    initialState
  );

  return (
    <ProfileContext.Provider value={{ profile_state, profile_dispatch }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
export default PostContextProvider;
