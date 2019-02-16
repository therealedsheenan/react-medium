import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

import postReducers from './posts/reducers';
import commentReducers from './comments/reducers';
import userReducers from './user/reducers';

const reducer = {
  postsList: postReducers.postsListReducer,
  postItem: postReducers.postItemReducer,
  commentsList: commentReducers.commentsListReducer,
  user: userReducers.userReducer
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
