import PropTypes from 'prop-types';

export const todoShape = PropTypes.shape({
  title: PropTypes.string,
  id: PropTypes.number,
  completed: PropTypes.bool,
});
