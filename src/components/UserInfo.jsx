import React from 'react';
import PropTypes from 'prop-types';

export function UserInfo({ name }) {
  return (
    <h2>{name}</h2>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string,
};

UserInfo.defaultProps = {
  name: 'user name',
};
