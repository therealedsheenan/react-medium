import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';
import * as helpers from '../reducer-helpers';

// User initial state
const userInitialState = {
  isLoading: true,
  isError: false,
  data: {}
};

// User reducer
const userReducer = createReducer(userInitialState, {
  [actions.loginUserRequest]: state => helpers.loadingObject(state),

  [actions.loginUserSuccess]: (state, action) =>
    helpers.successObject(state, action.payload),

  [actions.loginUserFailure]: state => helpers.errorObject(state),
  [actions.logoutUserRequest]: state => helpers.loadingObject(state),

  [actions.logoutUserSuccess]: () => userInitialState,

  [actions.registerUserSuccess]: (state, action) =>
    helpers.successObject(state, action.payload),

  [actions.registerUserFailure]: state => helpers.errorObject(state)
});

export default {
  userReducer
};
