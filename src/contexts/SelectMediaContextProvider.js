import React from "react";
import { selectmediaReducer } from "../reducers/SelectMediaReducer";

export const SelectMediaContext = React.createContext();
const initialState = {
  mediaPreview: null,
  post_media: null
};

const SelectMediaContextProvider = props => {
  const [media_state, media_dispatch] = React.useReducer(
    selectmediaReducer,
    initialState
  );

  return (
    <SelectMediaContext.Provider value={{ media_state, media_dispatch }}>
      {props.children}
    </SelectMediaContext.Provider>
  );
};
export default SelectMediaContextProvider;
