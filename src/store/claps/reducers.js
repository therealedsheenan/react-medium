import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';
import * as helpers from '../reducer-helpers';

// Comments list initial state
const clapsInitialState = {
  isLoading: true,
  isError: false,
  data: 0
};

// Comments list reducer
const clapsReducer = createReducer(clapsInitialState, {
  [actions.getClapsRequest]: state => helpers.loadingObject(state),
  [actions.postClapsRequest]: state => helpers.loadingObject(state),

  [actions.getClapsSuccess]: (state, action) =>
    helpers.successObject(state, action.payload),

  [actions.postClapsSuccess]: (state, action) =>
    helpers.successObject(state, action.payload),

  [actions.getClapsFailure]: state => helpers.errorObject(state),
  [actions.postClapsFailure]: state => helpers.errorObject(state)
});

export default {
  clapsReducer
};
