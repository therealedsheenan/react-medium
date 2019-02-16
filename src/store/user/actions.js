import { createAction } from 'redux-starter-kit';

import api from '../../services/api';
import auth from '../../services/authentication';

// Login user action creators
export const loginUserRequest = createAction('user/login/request');
export const loginUserSuccess = createAction('user/login/success');
export const loginUserFailure = createAction('user/login/failure');

// Logout user action creators
export const logoutUserRequest = createAction('user/logout/request');
export const logoutUserSuccess = createAction('user/logout/success');
export const logoutUserFailure = createAction('user/logout/failure');

// Register user action creators
export const registerUserRequest = createAction('user/register/request');
export const registerUserSuccess = createAction('user/register/success');
export const registerUserFailure = createAction('user/register/failure');

const actions = {
  // @param body - post request body
  loginUser: (payload, setErrors, history) => async dispatch => {
    try {
      dispatch(loginUserRequest(payload));
      const { status, error, data } = await api.post('/user/login', payload);
      if (status === 200 && !error) {
        dispatch(loginUserSuccess(data.user));
        auth.setToken(data.user.token);
        // redirect user to home page
        history.push('/');
      } else {
        setErrors({
          login: 'Invalid credentials.'
        });
      }
    } catch (e) {
      dispatch(loginUserFailure(e));
    }
  },
  // @param body - post request body
  registerUser: body => async dispatch => {
    try {
      dispatch(registerUserRequest());
      const response = await api.post('/user/new', body);
      dispatch(registerUserSuccess(response.data.user));
    } catch (e) {
      dispatch(registerUserFailure(e));
    }
  },
  logoutUser: history => async dispatch => {
    try {
      dispatch(logoutUserRequest());
      auth.signOut();
      dispatch(logoutUserSuccess());
      // redirect to login page
      history.push('/user/login');
    } catch (e) {
      dispatch(logoutUserFailure(e));
    }
  }
};

export default actions;
