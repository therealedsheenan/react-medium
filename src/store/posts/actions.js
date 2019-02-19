import { createAction } from 'redux-starter-kit';
import { push } from 'connected-react-router';

import api from '../../services/api';

export const postType = {
  published: 'published',
  draft: 'draft'
};

// GET ALL POSTS
export const getPostsListRequest = createAction('post/postsList/request');
export const getPostsListSuccess = createAction('post/postsList/success');
export const getPostsListFailure = createAction('post/postsList/failure');

// GET SINGLE POST
export const getPostItemRequest = createAction('post/postItem/request');
export const getPostItemSuccess = createAction('post/postItem/success');
export const getPostItemFailure = createAction('post/postItem/failure');

// CREATE POST
export const createPostItemRequest = createAction('post/createPost/request');
export const createPostItemSuccess = createAction('post/createPost/success');
export const createPostItemFailure = createAction('post/createPost/failure');

const actions = {
  /*
   * @params dispatch - function redux
   * @params postType - string - drafts | published
   */
  loadPostsLists: (type = postType.published) => async dispatch => {
    const urlQuery = type === postType.published ? '/posts' : '/posts/draft';
    try {
      dispatch(getPostsListRequest());
      const response = await api.get(urlQuery);
      dispatch(getPostsListSuccess(response.data.posts));
    } catch (e) {
      dispatch(getPostsListFailure(e));
    }
  },
  loadPostItem: postId => async dispatch => {
    try {
      dispatch(getPostItemRequest(postId));
      const response = await api.get(`/post/${postId}`);
      dispatch(getPostItemSuccess(response.data.post));
    } catch (e) {
      dispatch(getPostItemFailure(e));
    }
  },
  // eslint-disable-next-line
  createPostItem: (payload, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(false);
    try {
      dispatch(createPostItemRequest());
      const response = await api.post('/post/new', payload);
      dispatch(createPostItemSuccess(response.data.post));
      // redirect user to new post URL
      dispatch(push(`/post/${response.data.post.id}`));
    } catch (e) {
      dispatch(createPostItemFailure(e));
    }
  }
};

export default actions;
