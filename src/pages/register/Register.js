import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Fade } from "react-reveal";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { account, databases } from "../../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";

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

const Register = () => {
  const { theme_state } = React.useContext(ThemeContext);

  const history = useHistory();
  const { auth_dispatch } = React.useContext(AuthContext);
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);
  const RegistrationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Invalid email"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
  });

  const populateProfile = async (userID, name, avatar, coverphoto) => {
    controlLoading(true);
    try {
      const response = await databases.createDocument(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_PROFILE_COLLECTION_ID,
        uuidv4(),
        {
          userID: userID,
          name: name,
          avatar: avatar,
          coverphoto: coverphoto,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    controlLoading(true);

    const avatar = process.env.REACT_APP_AVATAR;
    const coverphoto = process.env.REACT_APP_COVERPHOTO;

    try {
      const response = await account.create(
        uuidv4(),

        values.email,
        values.password,
        values.name
      );
      console.log(response);
      await account.createEmailSession(values.email, values.password);
      populateProfile(response.$id, response.name, avatar, coverphoto);
      controlLoading(false);
      auth_dispatch({ type: "LOGIN" });
      history.push("/");
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
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={RegistrationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <CenterInput>
                  <LoginInput
                    placeholder="Full Name"
                    type="text"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                </CenterInput>
                {errors.name && touched.name && (
                  <InputErrorText>{errors.name}</InputErrorText>
                )}
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
                      Register
                    </SubMit>
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
            )}
          </Formik>
        </LoginContainer>
      </Fade>
    </LoginBackground>
  );
};

export default Register;
