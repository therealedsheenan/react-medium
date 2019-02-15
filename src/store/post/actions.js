import { createAction } from 'redux-starter-kit';

import api from '../../services/api';

export const getPosts = createAction('post/getAllPosts');
export const getPost = createAction('post/getPost');

const actions = {
  loadPosts: async dispatch => {
    try {
      dispatch(getPosts);
      const posts = await api.get('/posts');
      console.log(posts);
    } catch (e) {
      // dispatch({})
    }
  }
};

export default actions;
