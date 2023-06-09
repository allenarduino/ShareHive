import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContextProvider";
import BottomTab from "./components/BottomTab/BottomTab";
import DeskTopHeader from "./components/DeskTopHeader/DeskTopHeader";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import PostImage from "./pages/postimage/PostImage";
import PostVideo from "./pages/postvideo/PostVideo";
import EditProfile from "./pages/editprofile/EditProfile";
import SingleProfile from "./pages/singleprofile/SingleProfile";
import ScrollToTop from "./ScrollToTop";
import ViewImage from "./pages/viewimage/ViewImage";
import CommentPage from "./pages/commentpage/CommentPage";
import WritePost from "./pages/writepost/WritePost";

const App = () => {
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const bootstrapAsync = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      auth_dispatch({
        type: "LOGIN",
        payload: token
      });
    } else {
      auth_dispatch({
        type: "LOGOUT"
      });
    }
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      {auth_state.isLoggedIn ? (
        <React.Fragment>
          <DeskTopHeader />
          <BottomTab />
        </React.Fragment>
      ) : null}
      {auth_state.isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/post_image" component={PostImage} />
          <Route path="/post_video" component={PostVideo} />
          <Route path="/write_post" component={WritePost} />
          <Route path="/singleprofile" component={SingleProfile} />
          <Route path="/view_image" component={ViewImage} />
          <Route path="/comment_page" component={CommentPage} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      )}
    </Router>
  );
};
export default App;
