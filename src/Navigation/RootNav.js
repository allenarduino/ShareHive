import React from 'react';
import {AuthContext} from '../contexts/AuthContextProvider';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './BottomTap';
import AuthStack from './AuthStack';
import {account} from '../appwrite/appwriteConfig';

const RootNav = () => {
  const {auth_state, auth_dispatch} = React.useContext(AuthContext);

  const checkLoggin = async () => {
    try {
      await account.get();
      // already logged in
      auth_dispatch({
        type: 'LOGIN',
      });
    } catch (e) {
      if (e.code == 401) {
        // not logged in
        auth_dispatch({
          type: 'LOGOUT',
        });
      } else {
        // might be connection error or other errors
      }
    }
  };

  React.useEffect(() => {
    checkLoggin();
  }, []);

  return (
    <NavigationContainer>
      {auth_state.loggedIn ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNav;
