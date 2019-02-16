import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';

// Post list initial state
const postsListInitialState = {
  isLoading: true,
  isError: false,
  data: []
};

// Post list reducer
const commentsListReducer = createReducer(postsListInitialState, {
  [actions.getCommentsListRequest]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [actions.getCommentsListSuccess]: (state, action) => {
    const comments = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: comments
    };
  },

  [actions.getCommentsListFailure]: state => {
    return {
      ...state,
      isLoading: false,
      isError: true
    };
  }
});

export default {
  commentsListReducer
};
