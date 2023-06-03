import React from 'react';
import {Text, View} from 'react-native';
import RootNav from './Navigation/RootNav';
import AuthContextProvider from './contexts/AuthContextProvider';

const App = () => {
  return (
    <AuthContextProvider>
      <RootNav />
    </AuthContextProvider>
  );
};

export default App;
