import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../../components/Navigation';
import PostList from '../../components/PostList';
import Loading from '../../components/Loading';

import actions from '../../store/posts/actions';

const Index = props => {
  useEffect(() => {
    props.loadPosts(props.postType);
  }, [props.postType]);

  const { postsList } = props;
  return (
    <Fragment>
      <Navigation />
      <Fragment>
        {postsList.isLoading ? (
          <Loading />
        ) : (
          <PostList posts={postsList.data} />
        )}
      </Fragment>
    </Fragment>
  );
};

Index.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  postsList: PropTypes.object,
  postType: PropTypes.string.isRequired
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
)(Index);
