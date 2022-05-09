export const server = 'https://trendlabs-getweys.herokuapp.com/api';

export const headers = {
  Accept: 'application/json, text/plain, /',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const fetchToken = () => {
  var token = localStorage.getItem('authUser')
    ? JSON.parse(localStorage.getItem('authUser')).token
    : null;

  const config = {
    headers: {
      'x-auth-token': token,
      ...headers,
    },
  };

  return config;
};
