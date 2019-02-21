import { createAction } from 'redux-starter-kit';
import { push } from 'connected-react-router';

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

// Get user profile action creators
export const getUserProfileRequest = createAction('userProfile/get/request');
export const getUserProfileSuccess = createAction('userProfile/get/success');
export const getUserProfileFailure = createAction('userProfile/get/failure');

// Update user profile action creators
export const updateUserProfileRequest = createAction(
  'userProfile/update/request'
);
export const updateUserProfileSuccess = createAction(
  'userProfile/update/success'
);
export const updateUserProfileFailure = createAction(
  'userProfile/update/failure'
);

const actions = {
  updateUserProfile: (payload, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(false);
    try {
      dispatch(updateUserProfileRequest(payload));
      const { error, data } = await api.put('/user/profile', payload);
      if (!error) {
        dispatch(updateUserProfileSuccess(data.user));
        // refresh user profile
        dispatch(actions.getUserProfile());
      } else {
        setErrors({ userProfile: error });
        dispatch(updateUserProfileFailure(error));
      }
    } catch (e) {
      setErrors({ userProfile: e });
      dispatch(updateUserProfileFailure(e));
    }
  },
  getUserProfile: () => async dispatch => {
    try {
      dispatch(getUserProfileRequest());
      const { error, data } = await api.get('/user/profile');
      if (!error) {
        dispatch(getUserProfileSuccess(data.user));
      } else {
        dispatch(getUserProfileFailure(error));
      }
    } catch (e) {
      dispatch(registerUserFailure(e));
    }
  },
  // @param body - post request body
  loginUser: (payload, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(false);
    try {
      dispatch(loginUserRequest(payload));
      const { status, error, data } = await api.post('/user/login', payload);
      if (status === 200 && !error) {
        dispatch(loginUserSuccess(data.user));
        // store to localstorage
        auth.signIn(data.user);
        // force page reload to persist localstorage data
        window.location.reload();
        // redirect user to home page
        dispatch(push('/'));
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
  registerUser: (payload, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(false);
    try {
      dispatch(registerUserRequest(payload));
      const { status, error, data } = await api.post('/user/new', payload);
      if (status === 200 && !error) {
        dispatch(registerUserSuccess(data.user));
        // store to localstorage
        auth.signIn(data.user);
        // force page reload to persist localstorage data
        window.location.reload();
        // redirect user to home page
        dispatch(push('/'));
      } else {
        setErrors({
          register: 'Invalid credentials.'
        });
      }
    } catch (e) {
      dispatch(registerUserFailure(e));
    }
  },
  logoutUser: history => async dispatch => {
    try {
      dispatch(logoutUserRequest());
      auth.signOut();
      dispatch(logoutUserSuccess());
      // force page reload to persist localstorage data
      window.location.reload();
      history.push('/user/login');
    } catch (e) {
      dispatch(logoutUserFailure(e));
    }
  }
};

export default actions;
