import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import PostContext from "./contexts/PostContextProvider";
import AuthContext from "./contexts/AuthContextProvider";
import ThemeContext from "./contexts/ThemeContextProvider";
import ProfileContext from "./contexts/ProfileContextProvider";
import SelectMediaContext from "./contexts/SelectMediaContextProvider";
import CommentContext from "./contexts/CommentContextProvider";
ReactDOM.render(
  <PostContext>
    <AuthContext>
      <ThemeContext>
        <ProfileContext>
          <SelectMediaContext>
            <CommentContext>
              <App />
            </CommentContext>
          </SelectMediaContext>
        </ProfileContext>
      </ThemeContext>
    </AuthContext>
  </PostContext>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
