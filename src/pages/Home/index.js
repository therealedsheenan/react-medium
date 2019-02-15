import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Container } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

import Loading from '../../components/Loading';
import actions from '../../store/posts/actions';

const Home = props => {
  useEffect(() => {
    props.loadPosts();
  }, props.posts.isLoading);

  return (
    <Container>
      {props.posts.isLoading ? (
        <Loading />
      ) : (
        <Card.Group itemsPerRow={6}>
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
          <Card raised image={'https://source.unsplash.com/random'} />
        </Card.Group>
      )}
    </Container>
  );
};

Home.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  posts: PropTypes.object
};

const mapStateToProps = ({ posts }) => {
  return {
    posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: bindActionCreators(actions.loadPosts, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
