import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';

const initial_state = {
  isLoading: true,
  isError: false,
  posts: []
};

const postsReducer = createReducer(initial_state, {
  [actions.getPostsRequest]: (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [actions.getPostsSuccess]: (state, action) => {
    const posts = action.payload.data;
    return {
      ...state,
      isLoading: false,
      isError: false,
      posts
    };
  },

  [actions.getPostsFailure]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      isError: true
    };
  }
});

export default postsReducer;
