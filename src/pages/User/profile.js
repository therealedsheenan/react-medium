import React, { Fragment, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Form,
  Grid,
  Header,
  Message
} from 'semantic-ui-react';

import Navigation from '../../components/Navigation';
import userActions from '../../store/user/actions';

const UserProfile = ({ getUserProfile, userProfile, updateUserProfile }) => {
  useEffect(() => {
    getUserProfile();
  }, [false]);

  return (
    <Fragment>
      <Navigation />
      <Container className="container-main">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column className="grid-form">
            <Header as="h2" textAlign="center">
              User profile settings
            </Header>
            <Formik
              enableReinitialize
              initialValues={userProfile}
              onSubmit={async (values, { setErrors, setSubmitting }) => {
                const payload = {
                  userProfile: {
                    firstName: values.firstName,
                    lastName: values.lastName
                  }
                };
                await updateUserProfile(payload, setErrors, setSubmitting);
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string(),
                lastName: Yup.string()
              })}
              render={({ values, errors, handleSubmit, handleChange }) => {
                return (
                  <Fragment>
                    {errors.login && <Message error header={errors.login} />}

                    <Form size="large" onSubmit={handleSubmit}>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="First name"
                        name="firstName"
                        value={values.firstName}
                        error={Boolean(errors.firstName)}
                        onChange={handleChange}
                      />
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Last name"
                        name="lastName"
                        value={values.lastName}
                        error={Boolean(errors.lastName)}
                        onChange={handleChange}
                      />
                      <Button primary size="large" type="submit">
                        Update
                      </Button>
                    </Form>
                  </Fragment>
                );
              }}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Fragment>
  );
};

UserProfile.defaultProps = {
  userProfile: {
    firstName: '',
    lastName: ''
  }
};

UserProfile.propTypes = {
  userProfile: PropTypes.object,
  getUserProfile: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => {
  return {
    userProfile: user.data && user.data.userProfile && user.data.userProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: () => dispatch(userActions.getUserProfile()),
    updateUserProfile: (payload, setErrors, setSubmitting) =>
      dispatch(userActions.updateUserProfile(payload, setErrors, setSubmitting))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
