import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../services/authentication';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/user/login', state: { from: props.location } }}
        />
      )
    }
  />
);

PrivateRoute.defaultProps = {
  user: {}
};

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func
};

export default PrivateRoute;
