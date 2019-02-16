import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
  Message,
  Segment
} from 'semantic-ui-react';

import userActions from '../../store/user/actions';

const Login = ({ loginUser }) => (
  <Container style={{ marginTop: '7em' }}>
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Log-in to your account
        </Header>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const { email, password } = values;
            const payload = {
              user: {
                email,
                password
              }
            };
            await loginUser(payload, setErrors);
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required('Required'),
            password: Yup.string().required('Required')
          })}
          render={({ values, errors, handleSubmit, handleChange }) => (
            <Fragment>
              {errors.login && <Message error header={errors.login} />}
              <Form size="large" onSubmit={handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="email"
                    value={values.email}
                    error={Boolean(errors.email)}
                    onChange={handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    error={Boolean(errors.password)}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Button fluid size="large" type="submit">
                    Login
                  </Button>
                </Segment>
              </Form>
            </Fragment>
          )}
        />
        <Message>
          New to us? <Link to="/user/new">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </Container>
);

Login.defaultProps = {
  user: {}
};

Login.propTypes = {
  user: PropTypes.object,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // pass formik functions and router history to redux-thunk action creator
    loginUser: (payload, setErrors) =>
      dispatch(userActions.loginUser(payload, setErrors, ownProps.history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
