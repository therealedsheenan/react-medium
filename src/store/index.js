import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

import initReducer from './reducers.js';

const reducer = {
  init: initReducer
};

const middleware = [...getDefaultMiddleware()];

const preloadedState = {};

const index = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: []
});

export default index;
