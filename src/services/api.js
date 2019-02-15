import axios from 'axios';

const axiosApi = axios.create({
  baseUrl: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const api = query => {
  get: axiosApi
    .get(query)
    .then(res => {
      return res;
    })
    .catch(e => e)
    .then(res => res);
};

export default api;
