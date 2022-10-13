const _get = (url, params) => {
  if (params) {
    let paramsString = '';
    Object.keys(params).map((e, i) =>
      i === 0
        ? (paramsString += `?${e}=${params[e]}`)
        : (paramsString += `&${e}=${params[e]}`),
    );
    url += paramsString;
  }
  return fetch(url);
};

const _post = (url, params) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
};

export const logIn = () => {
  return _get('https://facebook.github.io/react-native/movies.json');
};

export const logout = () => {
  return _post('https://api.getpostman.com/apis', {
    workspace: 'yourValue',
    apikey: 'yourOtherValue',
  });
};
