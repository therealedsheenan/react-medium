import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import PostItem from '../../components/PostItem';
import CommentsList from '../../components/CommentsList';
import postActions from '../../store/posts/actions';
import commentActions from '../../store/comments/actions';

const Post = props => {
  useEffect(() => {
    props.loadPostItem();
    props.loadCommentsLists();
  }, props.postItem.isLoading);
  return (
    <Fragment>
      <Navigation />
      <Container style={{ marginTop: '7em' }}>
        {props.postItem.isLoading || props.commentsList.isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <PostItem post={props.postItem.data} />
            <CommentsList comments={props.commentsList.data} />
          </Fragment>
        )}
      </Container>
    </Fragment>
  );
};

Post.defaultProps = {
  postItem: {},
  commentsList: {}
};

Post.propTypes = {
  loadPostItem: PropTypes.func.isRequired,
  loadCommentsLists: PropTypes.func.isRequired,
  postItem: PropTypes.object,
  commentsList: PropTypes.object
};

const mapStateToProps = ({ postItem, commentsList }) => {
  return {
    postItem,
    commentsList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: { params }
  } = ownProps;
  return {
    loadPostItem: () => dispatch(postActions.loadPostItem(params.postId)),
    loadCommentsLists: () =>
      dispatch(commentActions.loadCommentsLists(params.postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
