import { createAction } from 'redux-starter-kit';

import api from '../../services/api';

// GET ALL POSTS
export const getPostsRequest = createAction('post/getAllPosts/request');
export const getPostsSuccess = createAction('post/getAllPosts/success');
export const getPostsFailure = createAction('post/getAllPosts/failure');

// // GET SINGLE POST
export const getPostRequest = createAction('post/getPost/request');
export const getPostSuccess = createAction('post/getPost/success');
export const getPostFailure = createAction('post/getPost/failure');

const actions = {
  loadPosts: () => async dispatch => {
    try {
      dispatch(getPostsRequest());
      const posts = await api.posts.get('/posts');
      dispatch(getPostsSuccess(posts));
    } catch (e) {
      dispatch(getPostsFailure(e));
    }
  },
  loadPost: postId => async dispatch => {
    try {
      dispatch(getPostRequest(postId));
      const post = await api.posts.get(`/post/${postId}`);
      dispatch(getPostSuccess(post));
    } catch (e) {
      dispatch(getPostFailure(e));
    }
  }
};

export default actions;
