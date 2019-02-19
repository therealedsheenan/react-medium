import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import PostList from '../../components/PostList';
import actions from '../../store/posts/actions';

const Home = props => {
  useEffect(() => {
    props.loadPosts();
  }, [false]);

  const { postsList } = props;
  return (
    <Fragment>
      <Navigation />
      {postsList.isLoading ? <Loading /> : <PostList posts={postsList.data} />}
    </Fragment>
  );
};

Home.propTypes = {
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
    loadPosts: () => dispatch(actions.loadPostsLists())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
