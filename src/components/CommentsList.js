import React from 'react';
import { Comment, Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => (
  <Container text className="container-comment">
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>

      {comments.map(comment => (
        <Comment key={comment.id}>
          <Comment.Avatar src="http://i.pravatar.cc/300" />
          <Comment.Content>
            <Comment.Author as="a">{comment.author}</Comment.Author>
            <Comment.Metadata>
              <div>{comment.createDate}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  </Container>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default CommentsList;
