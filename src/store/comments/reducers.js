import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';
import * as helpers from '../reducer-helpers';

// Comments list initial state
const postsListInitialState = {
  isLoading: true,
  isError: false,
  data: []
};

// Comments list reducer
const commentsListReducer = createReducer(postsListInitialState, {
  [actions.getCommentsListRequest]: state => helpers.loadingObject(state),

  [actions.getCommentsListSuccess]: (state, action) =>
    helpers.successObject(state, action.payload),

  [actions.getCommentsListFailure]: state => helpers.errorObject(state)
});

export default {
  commentsListReducer
};
