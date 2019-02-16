import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import Author from './Author';

const PostList = ({ post }) => (
  <Container text>
    {Object.keys(post).length > 0 && (
      <Fragment>
        <Header as="h1">{post.title}</Header>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.text}</p>
        <Author author={post.author} />
      </Fragment>
    )}
  </Container>
);

PostList.defaultProps = {
  post: {}
};

PostList.propTypes = {
  post: PropTypes.object
};

export default PostList;
