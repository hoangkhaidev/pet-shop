/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { store } from 'stores';

const defaults = {
  baseURL: process.env.REACT_APP_ROOT_API_URL || 'https://sbapi.arrowltd.net',
};

const api = (method, url, variables, isAuth = true) => new Promise((resolve, reject) => {
  let headers;
  const { token } = store.getState().authentication;

  if (isAuth) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
  }
  axios({
    url: `${defaults.baseURL}${url}`,
    method,
    headers,
    data: variables || {}
  }).then(
    (response) => {
      resolve(response.data);
    },
    (error) => {
      if (error.response) {
        console.log('error.response', error.response);
      }
    }
  );
});

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args)
};
