import axios from 'axios';

const key1 = 'AIzaSyDlwb3SvLX5B9OoBQWwQx';
const key2 = 'ckSWP6zzQxuQ';
const _get = (url, params) => {
  return axios.get(url, params);
};

const _post = (url, params) => {
  return axios.post(url, params);
};

const PREFIX = 'http://ec2-54-161-61-21.compute-1.amazonaws.com:8000';

export const logIn = params => {
  // axios.defaults.headers.common.Authoricczation = `Token ${token}`;
  return _post(`${PREFIX}/api/auth/login/`, params);
};
export const registerUser = params => {
  return _post(`${PREFIX}/api/auth/register/`, params);
};

export const logout = params => {
  return _post(`${PREFIX}/api/auth/logout/`);
};

export const getGeo = latlng => {
  return _get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${key1}_${key2}`,
  );
};
