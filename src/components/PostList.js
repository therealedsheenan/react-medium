import React from 'react';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

import { getFullName } from './Author';

const PostList = ({ posts }) => {
  const postsStatusHeader = () => {
    return posts.length > 0 && posts[0].publishedDate
      ? 'Published posts'
      : 'Draft posts';
  };

  return (
    <Container className="container-main">
      <Header as="h2" color="blue">
        <Icon name="book" />
        <Header.Content>{postsStatusHeader()}</Header.Content>
      </Header>
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
};

PostList.defaultProps = {
  posts: []
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default PostList;
