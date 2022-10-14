import axios from 'axios';

const _get = (url, params) => {
  return axios.get(url, params);
};

const _post = (url, params) => {
  return axios.post(url, params);
};

export const logIn = () => {
  // axios.defaults.headers.common.Authorization = `Token ${token}`;
  return _get('https://facebook.github.io/react-native/movies.json');
};

export const logout = () => {
  return _post('https://api.getpostman.com/apis', {
    workspace: 'yourValue',
    apikey: 'yourOtherValue',
  });
};
