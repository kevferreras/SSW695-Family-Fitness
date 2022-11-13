import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn, registerUser} from '../utils/api';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const register = params => {
    setIsLoading(true);
    registerUser(params)
      .then(res => {
        const token = res.data.token;
        console.log('token', token);
        setUserToken(token);
        AsyncStorage.setItem('userToken', token);
        axios.defaults.headers.common.Authoricczation = `Token ${token}`;
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert(JSON.stringify(err));
      });
  };

  const login = params => {
    setIsLoading(true);
    logIn(params)
      .then(res => {
        const token = res.data.token;
        console.log('token', token);
        setUserToken(token);
        AsyncStorage.setItem('userToken', token);
        axios.defaults.headers.common.Authoricczation = `Token ${token}`;
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setIsLoading(false);
        Alert.alert(JSON.stringify(err));
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let tmpUserToken = await AsyncStorage.getItem('userToken');
      setUserToken(tmpUserToken);
      axios.defaults.headers.common.Authoricczation = `Token ${tmpUserToken}`;
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn err ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{register, login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
