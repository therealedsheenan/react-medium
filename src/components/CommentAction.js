import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import commentActions from '../store/comments/actions';

const CommentAction = ({ comment, updateComment }) => {
  const handleCommentAction = async isApproved => {
    await updateComment(comment.post.id, comment.id, {
      comment: {
        approvedComment: isApproved
      }
    });
  };

  return (
    <Comment.Action>
      {comment.approvedComment ? (
        <Comment.Action onClick={() => handleCommentAction(false)} as="span">
          Disapprove
        </Comment.Action>
      ) : (
        <Comment.Action onClick={() => handleCommentAction(true)} as="span">
          Approve
        </Comment.Action>
      )}
    </Comment.Action>
  );
};

CommentAction.propTypes = {
  comment: PropTypes.object,
  updateComment: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    updateComment: (postId, commentId, payload) =>
      dispatch(commentActions.updateComment(postId, commentId, payload))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentAction);
