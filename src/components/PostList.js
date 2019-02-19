import React from 'react';
import { Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

import { getFullName } from './Author';

const PostList = ({ posts }) => (
  <Container className="container-main">
    <List divided relaxed>
      {posts.length > 0 ? (
        posts.map(post => (
          <List.Item key={post.id}>
            <Link
              to={{
                pathname: `/post/${post.id}`
              }}
            >
              <List.Content>
                <List.Header>{post.title}</List.Header>
                <List.Description>
                  Created at: {post.createDate}
                </List.Description>
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
        ))
      ) : (
        <Message icon="inbox" header="No posts yet." />
      )}
    </List>
  </Container>
);

PostList.defaultProps = {
  posts: []
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default PostList;
