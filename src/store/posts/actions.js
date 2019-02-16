import { createAction } from 'redux-starter-kit';

import api from '../../services/api';

// GET ALL POSTS
export const getPostsListRequest = createAction('post/postsList/request');
export const getPostsListSuccess = createAction('post/postsList/success');
export const getPostsListFailure = createAction('post/postsList/failure');

// // GET SINGLE POST
export const getPostItemRequest = createAction('post/postItem/request');
export const getPostItemSuccess = createAction('post/postItem/success');
export const getPostItemFailure = createAction('post/postItem/failure');

const actions = {
  loadPostsLists: async dispatch => {
    try {
      dispatch(getPostsListRequest());
      const response = await api.posts.get('/posts');
      dispatch(getPostsListSuccess(response.data.posts));
    } catch (e) {
      dispatch(getPostsListFailure(e));
    }
  },
  loadPostItem: postId => async dispatch => {
    try {
      dispatch(getPostItemRequest(postId));
      const response = await api.posts.get(`/post/${postId}`);
      dispatch(getPostItemSuccess(response.data.post));
    } catch (e) {
      dispatch(getPostItemFailure(e));
    }
  }
};

export default actions;
