import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import history from '../history';
import PostFormModal from './PostFormModal';
import auth from '../services/authentication';
import userActions from '../store/user/actions';
import mediumLogo from '../assets/medium.png';

const Navigation = ({ logoutUser, user }) => {
  useEffect(() => {
    auth.isAuthenticated();
  }, [user.isLoading]);
  return (
    <Menu fixed="top" borderless>
      <Container>
        <Menu.Item active={false} className="menu-logo">
          <Link to="/">
            <img src={mediumLogo} alt="medium-logo" />
          </Link>
        </Menu.Item>
        {!auth.isAuthenticated() ? (
          <Menu.Item active={false} position="right">
            <Link to="/user/login">Login</Link>
            <Link style={{ marginLeft: '20px' }} to="/user/new">
              Sign-up
            </Link>
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
              <Dropdown
                trigger={<Icon name="user circle" size="big" />}
                pointing="top left"
                icon={null}
              >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/user/profile">Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutUser}>
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
