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

// UPDATE POST
export const updatePostItemRequest = createAction('post/updatePost/request');
export const updatePostItemSuccess = createAction('post/updatePost/success');
export const updatePostItemFailure = createAction('post/updatePost/failure');

const actions = {
  /*
   * @params dispatch - function redux
   * @params postType - string - drafts | published
   */
  loadPostsLists: (type = postType.published) => async dispatch => {
    const urlQuery = type === postType.published ? '/posts' : '/posts/draft';
    try {
      dispatch(getPostsListRequest());
      const { data, error } = await api.get(urlQuery);
      if (!error) {
        dispatch(getPostsListSuccess(data.posts));
      } else {
        dispatch(getPostsListFailure(error));
      }
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
  createPostItem: (payload, setSubmitting) => async dispatch => {
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
  },
  updatePostItem: (
    postId,
    payload,
    setSubmitting = undefined
  ) => async dispatch => {
    if (setSubmitting) {
      setSubmitting(false);
    }
    try {
      dispatch(updatePostItemRequest());
      console.log(payload);
      console.log(postId);
      const response = await api.put(`/post/${postId}`, payload);
      dispatch(updatePostItemSuccess(response.data.post));
      // redirect user to new post URL
      dispatch(actions.loadPostItem(response.data.post.id));
    } catch (e) {
      dispatch(updatePostItemFailure(e));
    }
  }
};

export default actions;
