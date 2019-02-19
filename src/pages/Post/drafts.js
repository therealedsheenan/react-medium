import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../../components/Navigation';
import PostList from '../../components/PostList';
import actions from '../../store/posts/actions';

import { postType } from '../../store/posts/actions';
import Loading from '../Home';

const Drafts = props => {
  useEffect(() => {
    props.loadPosts(postType.draft);
  }, [false]);

  const { postsList } = props;
  return (
    <Fragment>
      <Navigation />
      <Fragment>
        <Navigation />
        {postsList.isLoading ? (
          <Loading />
        ) : (
          <PostList posts={postsList.data} />
        )}
      </Fragment>
    </Fragment>
  );
};

Drafts.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  postsList: PropTypes.object
};

const mapStateToProps = ({ postsList }) => {
  return {
    postsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: postType => dispatch(actions.loadPostsLists(postType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drafts);
