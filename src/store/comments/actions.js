import { createAction } from 'redux-starter-kit';
import { push } from 'connected-react-router';

import api from '../../services/api';

// GET ALL COMMENTS
export const getCommentsListRequest = createAction(
  'comment/commentsList/request'
);
export const getCommentsListSuccess = createAction(
  'comment/commentsList/success'
);
export const getCommentsListFailure = createAction(
  'comment/commentsList/failure'
);

// POST COMMENT
export const postCommentRequest = createAction('comment/postComment/request');
export const postCommentSuccess = createAction('comment/postComment/success');
export const postCommentFailure = createAction('comment/postComment/failure');

// UPDATE COMMENT
export const updateCommentRequest = createAction(
  'comment/updateComment/request'
);
export const updateCommentSuccess = createAction(
  'comment/updateComment/success'
);
export const updateCommentFailure = createAction(
  'comment/updateComment/failure'
);

const actions = {
  loadCommentsLists: postId => async dispatch => {
    try {
      dispatch(getCommentsListRequest());
      const response = await api.get(`/post/${postId}/comments`);
      dispatch(getCommentsListSuccess(response.data.comments));
    } catch (e) {
      dispatch(getCommentsListFailure(e));
    }
  },
  createComment: (postId, payload, setSubmitting) => async dispatch => {
    setSubmitting(false);
    try {
      dispatch(postCommentRequest(payload));
      const response = await api.post(`/post/${postId}/comment/new`, payload);
      dispatch(postCommentSuccess(response.data.comments));
      // reload page
      dispatch(push(`/post/${postId}`));
    } catch (e) {
      dispatch(postCommentFailure(e));
    }
  },
  updateComment: (postId, commentId, payload) => async dispatch => {
    try {
      dispatch(updateCommentRequest(payload));
      const response = await api.put(`/comment/${commentId}/approve`, payload);
      dispatch(updateCommentSuccess(response.data.comments));
      // reload page
      dispatch(actions.loadCommentsLists(postId));
    } catch (e) {
      dispatch(updateCommentFailure(e));
    }
  }
};

export default actions;
