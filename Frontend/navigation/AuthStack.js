import React, {useState} from 'react';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';
import Login from '../pages/Login';

const theme = createTheme({
  colors: {
    primary: '#61afef',
  },
});

const AuthStack = () => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
};
export default AuthStack;
