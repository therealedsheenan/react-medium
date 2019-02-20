import React from 'react';
import { Button, Container, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import commentActions from '../store/comments/actions';

const CommentForm = ({ postId, createComment }) => {
  const commentInitialValues = {
    author: '',
    text: ''
  };

  return (
    <Container text className="container-comment">
      <Formik
        initialValues={commentInitialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          console.log(setSubmitting);
          const { author, text } = values;
          const payload = {
            comment: {
              author,
              text
            }
          };

          await createComment(postId, payload, setSubmitting);
        }}
        validationSchema={Yup.object().shape({
          author: Yup.string()
            .min(4)
            .max(20)
            .required('Required'),
          text: Yup.string()
            .min(4)
            .max(200)
            .required('Required')
        })}
        render={({ values, errors, handleSubmit, handleChange }) => {
          return (
            <Form reply onSubmit={handleSubmit}>
              <Form.Input
                placeholder="Enter author's name..."
                name="author"
                value={values.author}
                error={Boolean(errors.author)}
                onChange={handleChange}
              />
              <Form.TextArea
                placeholder="Enter comment..."
                name="text"
                error={Boolean(errors.text)}
                value={values.text}
                onChange={handleChange}
              />
              <Button
                content="Add Comment"
                labelPosition="left"
                icon="edit"
                primary
                type="submit"
              />
            </Form>
          );
        }}
      />
    </Container>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => {
  return {
    createComment: (postId, payload, setSubmitting) =>
      dispatch(commentActions.createComment(postId, payload, setSubmitting))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
