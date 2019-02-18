import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import clapsActions from '../store/claps/actions';

const Clap = ({ clapsCount, postClap, postId }) => (
  <div className="clap" onClick={() => postClap(postId)}>
    <Icon name="sign language" size="large" />
    <strong>
      {clapsCount} clap
      {clapsCount > 1 ? 's' : ''}
    </strong>
  </div>
);

Clap.defaultProps = {
  clapsCount: 0
};

Clap.propTypes = {
  clapsCount: PropTypes.number,
  postClap: PropTypes.func.isRequired,
  postId: PropTypes.number
};

const mapDispatchToProps = dispatch => ({
  postClap: postId => dispatch(clapsActions.postClap(postId))
});

export default connect(
  null,
  mapDispatchToProps
)(Clap);
