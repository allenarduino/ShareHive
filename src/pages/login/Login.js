import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { account } from "../../appwrite/appwriteConfig";
import landingImg from "../../images/landingImage.avif";

import { Formik } from "formik";
import * as Yup from "yup";
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
  InputErrorText,
  LoginGrid,
  LoginImageCol,
  LoginImage,
} from "./styles";
import { ProfileContext } from "../../contexts/ProfileContextProvider";

const Login = () => {
  const { theme_state } = React.useContext(ThemeContext);

  const history = useHistory();
  const { auth_dispatch } = React.useContext(AuthContext);
  const { profile_dispatch } = React.useContext(ProfileContext);
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Invalid email"
      ),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    controlLoading(true);

    try {
      const response = await account.createEmailSession(
        values.email,
        values.password
      );
      console.log(response);
      controlLoading(false);
      auth_dispatch({ type: "LOGIN", payload: response.$id });
      profile_dispatch({
        type: "FETCH_CURRENT_USER",
        payload: [{ name: response.name, avatar: response.avatar }],
      });

      history.push("/");
    } catch (error) {
      if (error.code === 401) {
        setError("Invalid email or password");
      }
      controlLoading(false);
      console.error("Error logging in:", error);
    }
  };

  return (
    <LoginBackground style={{ backgroundColor: `${theme_state.background}` }}>
      <LoginGrid>
        <Fade left duration={900} distance="80px">
          <LoginContainer>
            <LoginHeaderText
              style={{
                color: theme_state.color,
              }}
            >
              Share<span style={{ color: "#e3405f" }}>Hive</span>
            </LoginHeaderText>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                  <CenterInput>
                    <LoginInput
                      placeholder="Email Address"
                      type="email"
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                  </CenterInput>
                  <CenterInput>
                    {errors.email && touched.email && (
                      <InputErrorText>{errors.email}</InputErrorText>
                    )}
                  </CenterInput>
                  <CenterInput>
                    <ErrorMessage>{error}</ErrorMessage>
                  </CenterInput>
                  <CenterInput>
                    <LoginInput
                      placeholder="Password"
                      type="password"
                      required
                      value={values.password}
                      onChange={handleChange("password")}
                    />
                  </CenterInput>
                  <CenterInput>
                    {errors.password && touched.password && (
                      <InputErrorText>{errors.password}</InputErrorText>
                    )}
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
                        onClick={handleSubmit}
                        style={{ backgroundColor: theme_state.secondaryColor }}
                      >
                        Login
                      </SubMit>
                    )}
                  </CenterInput>
                  <CenterInput>
                    <LinkText
                      style={{
                        color: theme_state.color,
                      }}
                    >
                      Not having an account?{" "}
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
              )}
            </Formik>
          </LoginContainer>
        </Fade>
        <Fade right duration={900} distance="80px">
          <LoginImageCol>
            <LoginImage src={landingImg} />
          </LoginImageCol>
        </Fade>
      </LoginGrid>
    </LoginBackground>
  );
};

export default Login;
