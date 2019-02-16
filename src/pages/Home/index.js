import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Loading from '../../components/Loading';
import PostList from '../../components/PostList';
import actions from '../../store/posts/actions';

const Home = props => {
  useEffect(() => {
    props.loadPosts();
  }, props.postsList.isLoading);

  return (
    <Container style={{ marginTop: '7em' }}>
      {props.postsList.isLoading ? (
        <Loading />
      ) : (
        <PostList posts={props.postsList.data} />
      )}
    </Container>
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
    loadPosts: () => dispatch(actions.loadPostsLists)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
