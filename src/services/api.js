import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
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
      }))
};

const posts = {
  get: query => requests.get(query)
};

export default {
  posts
};
