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

  const signup = (e) => {
    e.preventDefault();
    controlLoading(true);
    const data = {
      name: name,
      email: email,
      password: password,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error == null) {
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
