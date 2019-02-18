import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';
import * as helpers from '../reducer-helpers';

// Post list initial state
const postsListInitialState = {
  isLoading: true,
  isError: false,
  data: []
};

// Post item initial state
const postItemInitialState = {
  isLoading: true,
  isError: false,
  data: {}
};

// Post list reducer
const postsListReducer = createReducer(postsListInitialState, {
  [actions.getPostsListRequest]: state => helpers.loadingObject(state),

  [actions.getPostsListSuccess]: (state, action) =>
    helpers.successObject(state, action.payload),

  [actions.getPostsListFailure]: state => helpers.errorObject(state)
});

// Post item reducer
const postItemReducer = createReducer(postItemInitialState, {
  [actions.getPostItemRequest]: state => helpers.loadingObject(state),

  [actions.getPostItemSuccess]: (state, action) =>
    helpers.successObject(state, action.payload),

  [actions.getPostItemFailure]: state => helpers.errorObject(state)
});

export default {
  postsListReducer,
  postItemReducer
};
