import React, { Fragment, useState } from 'react';
import { Button, Message, Modal, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import postActions from '../store/posts/actions';

const PostFormModal = ({ createPostItem }) => {
  const [open, handleModal] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => handleModal(!open)}>New Post</Button>
      <Modal size="small" open={open} onClose={() => handleModal(false)}>
        <Modal.Header>New Post</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{ title: '', text: '' }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const { title, text } = values;
              const payload = {
                post: {
                  title,
                  text
                }
              };
              await createPostItem(payload, setErrors, setSubmitting);
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .min(6)
                .max(20)
                .required('Required'),
              text: Yup.string()
                .min(4)
                .max(200)
                .required('Required')
            })}
            render={({ values, errors, handleSubmit, handleChange }) => (
              <Fragment>
                {errors.register && <Message error header={errors.register} />}
                <Form size="large" onSubmit={handleSubmit}>
                  <Form.Input
                    placeholder="Enter post title..."
                    name="title"
                    value={values.title}
                    error={Boolean(errors.title)}
                    onChange={handleChange}
                  />
                  <Form.TextArea
                    placeholder="Enter post contents..."
                    name="text"
                    error={Boolean(errors.text)}
                    value={values.text}
                    onChange={handleChange}
                  />
                  <Button negative onClick={() => handleModal(false)}>
                    Cancel
                  </Button>
                  <Button positive type="submit">
                    Create
                  </Button>
                </Form>
              </Fragment>
            )}
          />
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

PostFormModal.propTypes = {
  createPostItem: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    // pass formik functions and router history to redux-thunk action creator
    createPostItem: (payload, setErrors, setSubmitting) =>
      dispatch(postActions.createPostItem(payload, setErrors, setSubmitting))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormModal);
