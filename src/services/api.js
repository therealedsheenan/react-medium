import axios from 'axios';

import auth from './authentication';

const token = auth.isAuthenticated() ? `Bearer ${auth.isAuthenticated()}` : '';

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token
  },
  withCredentials: true
});

const requests = {
  get: query =>
    axiosApi
      .get(query)
      .then(res => ({
        status: res.status,
        data: res.data
      }))
      .catch(error => ({
        error: error.message
      })),
  post: (query, body) =>
    axiosApi
      .post(query, body)
      .then(res => ({
        status: res.status,
        data: res.data
      }))
      .catch(error => ({
        error: error.message
      })),
  put: (query, body) =>
    axiosApi
      .put(query, body)
      .then(res => ({
        status: res.status,
        data: res.data
      }))
      .catch(error => ({
        error: error.message
      }))
};

export default requests;
