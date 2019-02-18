import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import Clap from './Clap';
import Author from './Author';

const PostList = ({ post, claps }) => (
  <Container text>
    {Object.keys(post).length > 0 && (
      <Fragment>
        <Header as="h1">{post.title}</Header>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.text}</p>
        <Clap clapsCount={claps} postId={post.id} />
        <Author author={post.author} />
      </Fragment>
    )}
  </Container>
);

PostList.defaultProps = {
  post: {},
  claps: 0
};

PostList.propTypes = {
  post: PropTypes.object,
  claps: PropTypes.number
};

export default PostList;
