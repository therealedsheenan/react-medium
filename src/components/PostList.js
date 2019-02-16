import React from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getFullName } from './Author';

const PostList = ({ posts }) => (
  <List divided relaxed>
    {posts.map(post => (
      <List.Item key={post.id}>
        <Link
          to={{
            pathname: `/post/${post.id}`
          }}
        >
          <List.Content>
            <List.Header>{post.title}</List.Header>
            <List.Description>Created at: {post.createDate}</List.Description>
            <List.Description>
              Author:
              {getFullName(
                post.author.userProfile.firstName,
                post.author.userProfile.lastName
              )}
            </List.Description>
          </List.Content>
        </Link>
      </List.Item>
    ))}
  </List>
);

PostList.defaultProps = {
  posts: []
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default PostList;
