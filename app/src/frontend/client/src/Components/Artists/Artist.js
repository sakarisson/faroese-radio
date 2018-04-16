import React from 'react';
import PropTypes from 'prop-types';

const Artist = props => (
  <div>{props.name}</div>
);

Artist.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Artist;
