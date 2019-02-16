import { createAction } from 'redux-starter-kit';

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

const actions = {
  loadCommentsLists: postId => async dispatch => {
    try {
      dispatch(getCommentsListRequest());
      const response = await api.posts.get(`/post/${postId}/comments`);
      dispatch(getCommentsListSuccess(response.data.comments));
    } catch (e) {
      dispatch(getCommentsListFailure(e));
    }
  }
};

export default actions;
