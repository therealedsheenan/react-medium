import { createAction } from 'redux-starter-kit';

import api from '../../services/api';

// GET claps count
export const getClapsRequest = createAction('clap/clapsCount/request');
export const getClapsSuccess = createAction('clap/clapsCounts/success');
export const getClapsFailure = createAction('clap/clapsCount/failure');

// POST claps
export const postClapsRequest = createAction('clap/postClap/request');
export const postClapsSuccess = createAction('clap/postClap/success');
export const postClapsFailure = createAction('clap/postClap/failure');

const actions = {
  loadPostClaps: postId => async dispatch => {
    try {
      dispatch(getClapsRequest());
      const response = await api.get(`/post/${postId}/claps`);
      dispatch(getClapsSuccess(response.data.claps));
    } catch (e) {
      dispatch(getClapsFailure(e));
    }
  },
  postClap: postId => async dispatch => {
    try {
      dispatch(postClapsRequest(postId));
      const response = await api.post(`/post/${postId}/clap`);
      dispatch(postClapsSuccess(response.data.claps));
    } catch (e) {
      dispatch(postClapsFailure());
    }
  }
};

export default actions;
