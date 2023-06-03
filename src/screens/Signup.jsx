import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

const Signup = ({navigation}) => {
  const [loading, controlLoading] = React.useState(false);

  const RegistrationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .matches(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Invalid email',
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
        'Password must contain at least one letter, one number, and one special character',
      ),
  });

  const handleSubmit = () => {
    alert('hey');
  };
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#fff', marginTop: -2}}>
        <View style={styles.signupHeadingContainer}>
          <Text style={styles.signupHeadingText}>Sign Up</Text>
          <Text style={{marginTop: 8}}>Sign up to continue</Text>
        </View>

        <Formik
          initialValues={{name: '', email: '', password: ''}}
          validationSchema={RegistrationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.inputField}
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <View style={{marginTop: '13%'}}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.inputField}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
              <View style={{marginTop: '13%'}}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.inputField}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={true}
                />
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              <View style={{marginTop: '5%'}}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.signupButton}>
                  <Text style={styles.signupText}>
                    {loading ? 'Loading...' : 'Signup'}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 4,
                    marginBottom: 15,
                    color: '#333',
                  }}>
                  Already have an account?{' '}
                  <Text
                    onPress={() => navigation.navigate('Login')}
                    style={{textDecorationLine: 'underline'}}>
                    Login
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  signupHeadingContainer: {
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  signupHeadingText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 30,
  },
  formContainer: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: '15%',
  },
  label: {
    color: '#333',
    fontSize: 16,
  },
  inputField: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: '#333',
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    paddingLeft: 10,
    color: '#333',
  },

  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
  },

  signupButton: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Signup;
