import React, {useState} from 'react';
import {AuthProvider} from './context/AuthContext';
import AppNav from './navigation/AppNav';

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
