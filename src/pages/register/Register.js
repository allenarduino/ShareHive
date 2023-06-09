import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { account } from "../../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import {
  LoginBackground,
  LoginContainer,
  LoginHeaderText,
  Form,
  CenterInput,
  LoginInput,
  LinkText,
  SubMit,
  LoadingButton,
  ErrorMessage,
} from "./styles";

const Register = () => {
  const { theme_state } = React.useContext(ThemeContext);

  const history = useHistory();
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_email_change = (e) => {
    setEmail(e.target.value);
  };

  const handle_password_change = (e) => {
    setPassword(e.target.value);
  };

  const handle_name_change = (e) => {
    setName(e.target.value);
  };

  const signup = async (e) => {
    e.preventDefault();
    controlLoading(true);
    const data = {
      userId: uuidv4(),
      name: name,
      email: email,
      password: password,
    };

    const avatar = process.env.REACT_APP_AVATAR;
    const coverphoto = process.env.REACT_APP_COVERPHOTO;

    try {
      const response = await account.create(
        uuidv4(),

        email,
        password,
        name,
        avatar,
        coverphoto
      );
      console.log("Account created successfully");
      console.log(response);
      controlLoading(false);
    } catch (error) {
      if (error.code === 409) {
        setError("User with email already exists");
      }
      controlLoading(false);
      console.error("Error creating account:", error);
    }
  };

  return (
    <LoginBackground style={{ backgroundColor: `${theme_state.background}` }}>
      <Fade bottom duration={900} distance="40px">
        <LoginContainer>
          <LoginHeaderText
            style={{
              color: theme_state.color,
            }}
          >
            Register to ShareHub
          </LoginHeaderText>
          <Form onSubmit={signup}>
            <CenterInput>
              <LoginInput
                placeholder="Full Name"
                type="text"
                required
                value={name}
                onChange={handle_name_change}
              />
            </CenterInput>
            <CenterInput>
              <LoginInput
                placeholder="Email Address"
                type="email"
                required
                value={email}
                onChange={handle_email_change}
              />
            </CenterInput>
            <CenterInput>
              <ErrorMessage>{error}</ErrorMessage>
            </CenterInput>
            <CenterInput>
              <LoginInput
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={handle_password_change}
              />
            </CenterInput>
            <CenterInput>
              {loading ? (
                <LoadingButton
                  style={{ backgroundColor: theme_state.secondaryColor }}
                >
                  Loading...
                </LoadingButton>
              ) : (
                <SubMit
                  type="submit"
                  value="Register"
                  required
                  style={{ backgroundColor: theme_state.secondaryColor }}
                />
              )}
            </CenterInput>
            <CenterInput>
              <LinkText
                style={{
                  color: theme_state.color,
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: theme_state.secondaryColor,
                    textDecoration: "none",
                  }}
                >
                  Log in
                </Link>
              </LinkText>
            </CenterInput>
          </Form>
        </LoginContainer>
      </Fade>
    </LoginBackground>
  );
};

export default Register;
