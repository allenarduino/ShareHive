import React from "react";
import { authReducer } from "../reducers/AuthReducer";

export const AuthContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  loading: true,
};

const AuthContextProvider = (props) => {
  const [auth_state, auth_dispatch] = React.useReducer(
    authReducer,
    initialState
  );

  return (
    <AuthContext.Provider value={{ auth_state, auth_dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
