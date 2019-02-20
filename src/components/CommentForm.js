import React, { Fragment, useState } from 'react';
import { Button, Message, Modal, Form, Icon } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import postActions from '../store/posts/actions';

const CommentForm = ({ createPostItem, isNew, post, updatePostItem }) => {
  const [open, handleModal] = useState(false);

  const formInitialValues = {
    title: isNew ? '' : post.title,
    text: isNew ? '' : post.text
  };

  const titleText = isNew ? 'New' : 'Update';

  return (
    <Fragment>
      {isNew ? (
        <Button primary onClick={() => handleModal(!open)}>
          {titleText} Post
        </Button>
      ) : (
        <Button primary icon onClick={() => handleModal(!open)}>
          <Icon name="pencil alternate" />
        </Button>
      )}

      <Modal size="small" open={open} onClose={() => handleModal(false)}>
        <Modal.Header>{titleText} Post</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={formInitialValues}
            onSubmit={async (values, { setSubmitting }) => {
              const { title, text } = values;
              const payload = {
                post: {
                  title,
                  text
                }
              };
              if (isNew) {
                await createPostItem(payload, setSubmitting);
              } else {
                await updatePostItem(post.id, payload, setSubmitting);
              }
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
                    Submit
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

CommentForm.propTypes = {
  createPostItem: PropTypes.func.isRequired,
  updatePostItem: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired,
  post: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => {
  return {
    // pass formik functions and router history to redux-thunk action creator
    createPostItem: (payload, setSubmitting) =>
      dispatch(postActions.createPostItem(payload, setSubmitting)),
    updatePostItem: (postId, payload, setErrors, setSubmitting) =>
      dispatch(postActions.updatePostItem(postId, payload, setSubmitting))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
