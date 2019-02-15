import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

import postsReducer from './posts/reducers';

const reducer = {
  posts: postsReducer
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
