import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import IsLoading from '../../components/IsLoading';
import PostFormModal from '../../components/PostFormModal';
import Navigation from '../../components/Navigation';
import PostItem from '../../components/PostItem';
import CommentsList from '../../components/CommentsList';
import CommentForm from '../../components/CommentForm';

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

  // publish or draft a post
  const publishDraftPost = date => {
    props.updatePostItem({
      post: {
        publishedDate: date ? date : null
      }
    });
  };

  if (props.postItem.isError) {
    return <Redirect to="/not-found" />;
  }

  return (
    <Fragment>
      <Navigation />
      <Container className="container-main">
        <Fragment>
          {IsLoading(
            props.postItem.isLoading,
            () =>
              props.postItem.data.isAuthor && (
                <Container text>
                  <PostFormModal isNew={false} post={props.postItem.data} />
                  {!props.postItem.data.publishedDate ? (
                    <Button
                      primary
                      onClick={() => publishDraftPost(new Date())}
                    >
                      Publish post
                    </Button>
                  ) : (
                    <Button secondary onClick={() => publishDraftPost()}>
                      Draft post
                    </Button>
                  )}
                </Container>
              )
          )}
          {IsLoading(props.postItem.isLoading, () => (
            <PostItem post={props.postItem.data} claps={props.claps.data} />
          ))}

          {IsLoading(
            props.commentsList.isLoading || props.postItem.isLoading,
            () => (
              <CommentsList
                isAuthor={props.postItem.data && props.postItem.data.isAuthor}
                comments={props.commentsList.data}
              />
            )
          )}

          {IsLoading(props.postItem.isLoading, () => (
            <CommentForm postId={postId} />
          ))}
        </Fragment>
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
  updatePostItem: PropTypes.func.isRequired,
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
    updatePostItem: payload =>
      dispatch(postActions.updatePostItem(params.postId, payload)),
    loadCommentsLists: () =>
      dispatch(commentActions.loadCommentsLists(params.postId)),
    loadPostClaps: () => dispatch(clapsActions.loadPostClaps(params.postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
