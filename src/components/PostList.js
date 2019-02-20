import React from 'react';
import {
  Container,
  Header,
  Icon,
  List,
  Message,
  Grid,
  Image
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      <List divided relaxed className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <List.Item key={post.id}>
              <Link
                to={{
                  pathname: `/post/${post.id}`
                }}
              >
                <List.Content align="left">
                  <Grid divided="vertically">
                    <Grid.Row columns={2} className="post-list-item">
                      <Grid.Column className="post-list-info">
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
                      </Grid.Column>
                      <Grid.Column align="right" className="post-list-image">
                        <Image
                          className="image"
                          src="https://source.unsplash.com/random"
                          alt="dummy image"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
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
