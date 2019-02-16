import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';

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
  [actions.getPostsListRequest]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [actions.getPostsListSuccess]: (state, action) => {
    const posts = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: posts
    };
  },

  [actions.getPostsListFailure]: state => {
    return {
      ...state,
      isLoading: false,
      isError: true
    };
  }
});

// Post item reducer
const postItemReducer = createReducer(postItemInitialState, {
  [actions.getPostItemRequest]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [actions.getPostItemSuccess]: (state, action) => {
    const post = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: post
    };
  },

  [actions.getPostItemFailure]: state => {
    return {
      ...state,
      isLoading: false,
      isError: true
    };
  }
});

export default {
  postsListReducer,
  postItemReducer
};
