import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { account } from "../../appwrite/appwriteConfig";

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
} from "./styles";

const Login = () => {
  const { theme_state } = React.useContext(ThemeContext);

  const history = useHistory();
  const { auth_dispatch } = React.useContext(AuthContext);
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
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
      auth_dispatch({ type: "LOGIN" });
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
      <Fade bottom duration={900} distance="40px">
        <LoginContainer>
          <LoginHeaderText
            style={{
              color: theme_state.color,
            }}
          >
            Register to ShareHub
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
                {errors.email && touched.email && (
                  <InputErrorText>{errors.email}</InputErrorText>
                )}
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
                {errors.password && touched.password && (
                  <InputErrorText>{errors.password}</InputErrorText>
                )}
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
                      to="/login"
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
    </LoginBackground>
  );
};

export default Login;
