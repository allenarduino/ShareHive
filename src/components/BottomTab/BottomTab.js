import React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { BottomNav, BnTab, OptionsContainer, FileInput } from "./styles";
import * as Icon from "react-feather";
import Sheet from "react-modal-sheet";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const BottomTab = props => {
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setOpen] = React.useState(false);

  const { media_dispatch } = React.useContext(SelectMediaContext);
  const { theme_state } = React.useContext(ThemeContext);

  const handle_image_change = e => {
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
    history.push("/post_image");
    setOpen(false);
  };

  const handle_video_change = e => {
    history.push("/post_video");
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
    setOpen(false);
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <BottomNav style={{ backgroundColor: theme_state.background }}>
        <BnTab>
          {location.pathname === "/" ? (
            <Link to="/" style={{ color: "black" }}>
              <Icon.Home
                name="home-outline"
                color={theme_state.color}
                size={27}
              />
            </Link>
          ) : (
            <Link to="/" style={{ color: theme_state.color }}>
              <Icon.Home size={25} color={theme_state.color} />
            </Link>
          )}
        </BnTab>
        <BnTab>
          {location.pathname === "/create_post" ? (
            <Icon.PlusCircle
              className="mr-2 feedIcons"
              color={theme_state.color}
              size={27}
            />
          ) : (
            <Icon.PlusCircle
              className="mr-2 feedIcons"
              size={25}
              onClick={() => setOpen(true)}
              color={theme_state.color}
            />
          )}
        </BnTab>
        <BnTab>
          {location.pathname === "/profile" ? (
            <Link to="/profile" style={{ color: theme_state.color }}>
              <Icon.User
                className="mr-2 feedIcons"
                color={theme_state.color}
                size={27}
              />
            </Link>
          ) : (
            <Link to="/profile" style={{ color: theme_state.color }}>
              <Icon.User
                className="mr-2 feedIcons"
                size={25}
                color={theme_state.color}
              />
            </Link>
          )}
        </BnTab>
        {/*****************Modal*************** */}
        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container
            style={{
              height: 250,
              paddingLeft: 20,
              backgroundColor: theme_state.background
            }}
          >
            <Sheet.Header />
            <Sheet.Content>
              <label>
                <OptionsContainer>
                  <FileInput
                    type="file"
                    required
                    onChange={handle_image_change}
                    accept="image/x-png,image/jpeg,image/jpg"
                  />
                  <b style={{ color: theme_state.color }}>Add Photo</b>{" "}
                  <Icon.Image
                    style={{ marginLeft: 10, color: theme_state.color }}
                    size={25}
                  />
                </OptionsContainer>
              </label>
              <label>
                <OptionsContainer>
                  <FileInput
                    type="file"
                    required
                    onChange={handle_video_change}
                    accept="video/mp4,video/mp3"
                  />
                  <b style={{ color: theme_state.color }}>Add Video</b>{" "}
                  <Icon.Video
                    style={{ marginLeft: 10, color: theme_state.color }}
                    size={25}
                  />
                </OptionsContainer>
              </label>
              <OptionsContainer
                onClick={() => {
                  history.push("/write_post");
                  setOpen(false);
                }}
              >
                <b style={{ color: theme_state.color }}>Write Post</b>{" "}
                <Icon.Feather
                  style={{ marginLeft: 10, color: theme_state.color }}
                  size={25}
                />
              </OptionsContainer>
            </Sheet.Content>
          </Sheet.Container>

          <Sheet.Backdrop onClick={() => setOpen(false)} />
        </Sheet>
      </BottomNav>
    </div>
  );
};

export default BottomTab;
