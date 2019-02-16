import React from 'react';
import { Button, Comment, Form, Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => (
  <Container text style={{ marginTop: '2em' }}>
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
      <Form reply>
        <Form.TextArea />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </Comment.Group>
  </Container>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default CommentsList;
