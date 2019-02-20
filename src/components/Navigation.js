import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';

import PostFormModal from './PostFormModal';
import auth from '../services/authentication';
import userActions from '../store/user/actions';

const Navigation = ({ logoutUser, user }) => {
  useEffect(() => {
    auth.isAuthenticated();
  }, [user.isLoading]);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item active={false}>
          <Link to="/">
            <strong>React Medium</strong>
          </Link>
        </Menu.Item>
        {!auth.isAuthenticated() ? (
          <Menu.Item active={false} position="right">
            <Button inverted>
              <Link to="/user/login">Login </Link>
            </Button>
            <Button inverted style={{ marginLeft: '0.5em' }}>
              <Link to="/user/new"> Sign Up</Link>
            </Button>
          </Menu.Item>
        ) : (
          <Fragment>
            <Menu.Item active={false}>
              <Link to="/drafts">Draft</Link>
            </Menu.Item>
            <Menu.Item active={false}>
              <PostFormModal isNew />
            </Menu.Item>
            <Menu.Item active={false} position="right">
              <Button inverted onClick={logoutUser}>
                Logout
              </Button>
            </Menu.Item>
          </Fragment>
        )}
      </Container>
    </Menu>
  );
};

Navigation.defaultProps = {
  user: {}
};

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(userActions.logoutUser(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
