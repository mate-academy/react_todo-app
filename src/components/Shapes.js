import PropTypes from 'prop-types';

export const todoShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  completed: PropTypes.bool,
});
