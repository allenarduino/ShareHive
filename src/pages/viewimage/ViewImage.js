import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ImageContainer, Image, BackArrowContainer } from "./styles";

const ViewImage = () => {
  const location = useLocation();
  const history = useHistory();
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;
  return (
    <ImageContainer>
      <BackArrowContainer>
        <Icon.ArrowLeft
          color="#fff"
          size={25}
          onClick={() => history.goBack()}
        />
      </BackArrowContainer>
      <Image src={location.state.image} />
    </ImageContainer>
  );
};

export default ViewImage;
