import { createAction } from 'redux-starter-kit';

import api from '../../services/api';

export const getPostsRequest = createAction('post/getAllPosts/request');
export const getPostsSuccess = createAction('post/getAllPosts/success');
export const getPostsFailure = createAction('post/getAllPosts/failure');

export const getPost = createAction('post/getPost');

const actions = {
  loadPosts: () => async dispatch => {
    try {
      dispatch(getPostsRequest);
      const posts = await api.posts.get('/posts');
      dispatch(getPostsSuccess(posts));
    } catch (e) {
      dispatch(getPostsFailure(e));
    }
  }
};

export default actions;
