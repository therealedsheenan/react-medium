import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import Loading from '../../components/Loading';
import PostFormModal from '../../components/PostFormModal';
import Navigation from '../../components/Navigation';
import PostItem from '../../components/PostItem';
import CommentsList from '../../components/CommentsList';
import postActions from '../../store/posts/actions';
import commentActions from '../../store/comments/actions';
import clapsActions from '../../store/claps/actions';

const Post = props => {
  const postId = props.match.params.postId;

  // Effects that relies only on post id
  useEffect(() => {
    props.loadCommentsLists();
  }, [postId]);

  useEffect(() => {
    props.loadPostItem();
  }, [Object.keys(props.postItem).length]);

  useEffect(() => {
    props.loadPostClaps();
  }, [props.claps.data]);

  if (props.postItem.isError) {
    return <Redirect to="/not-found" />;
  }

  return (
    <Fragment>
      <Navigation />
      <Container className="container-main">
        {props.postItem.isLoading || props.commentsList.isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <Container text>
              <PostFormModal isNew={false} post={props.postItem.data} />
            </Container>
            <PostItem post={props.postItem.data} claps={props.claps.data} />
            <CommentsList comments={props.commentsList.data} />
          </Fragment>
        )}
      </Container>
    </Fragment>
  );
};

Post.defaultProps = {
  postItem: {},
  commentsList: {},
  claps: {}
};

Post.propTypes = {
  match: PropTypes.object,
  claps: PropTypes.object,
  loadPostItem: PropTypes.func.isRequired,
  loadCommentsLists: PropTypes.func.isRequired,
  loadPostClaps: PropTypes.func.isRequired,
  postItem: PropTypes.object,
  commentsList: PropTypes.object
};

const mapStateToProps = ({ postItem, commentsList, claps }) => {
  return {
    postItem,
    commentsList,
    claps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: { params }
  } = ownProps;
  return {
    loadPostItem: () => dispatch(postActions.loadPostItem(params.postId)),
    loadCommentsLists: () =>
      dispatch(commentActions.loadCommentsLists(params.postId)),
    loadPostClaps: () => dispatch(clapsActions.loadPostClaps(params.postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
