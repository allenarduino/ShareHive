import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import {
  LoginBackground,
  LoginContainer,
  LoginHeaderText,
  Form,
  CenterInput,
  LoginInput,
  SubMit,
  LinkText,
  ErrorMessage,
  LoadingButton,
} from "./styles";

const Login = () => {
  const history = useHistory();
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;

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

  const login = (e) => {
    e.preventDefault();
    controlLoading(true);
    const data = {
      email: email,
      password: password,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error == null) {
          auth_dispatch({ type: "LOGIN", payload: data });
          history.push("/");
        } else {
          setError(data.error);
          controlLoading(false);
        }
      })
      .catch((err) => {
        alert(err);
        controlLoading(false);
      });
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
            Log in to ShareHub
          </LoginHeaderText>
          <Form onSubmit={login}>
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
              <LoginInput
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={handle_password_change}
              />
            </CenterInput>
            <CenterInput>
              <ErrorMessage>{error}</ErrorMessage>
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
                  placeholder="Password"
                  type="submit"
                  value="Log in"
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
                Don't have an account?{" "}
                <Link
                  to="/"
                  style={{
                    color: theme_state.secondaryColor,
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </LinkText>
            </CenterInput>
          </Form>
        </LoginContainer>
      </Fade>
    </LoginBackground>
  );
};

export default Login;
