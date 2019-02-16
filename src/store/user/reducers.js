import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';

// User initial state
const userInitialState = {
  isLoading: true,
  isError: false,
  data: {}
};

// User reducer
const userReducer = createReducer(userInitialState, {
  [actions.loginUserRequest]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [actions.loginUserSuccess]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: user
    };
  },

  [actions.loginUserFailure]: state => {
    return {
      ...state,
      isLoading: false,
      isError: true
    };
  },

  [actions.logoutUserRequest]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [actions.logoutUserSuccess]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: user
    };
  },

  [actions.logoutUserFailure]: state => {
    return {
      ...state,
      isLoading: false,
      isError: true
    };
  },

  [actions.registerUserRequest]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [actions.registerUserSuccess]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: user
    };
  },

  [actions.registerUserFailure]: state => {
    return {
      ...state,
      isLoading: false,
      isError: true
    };
  }
});

export default {
  userReducer
};
