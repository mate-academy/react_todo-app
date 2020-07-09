import PropTypes from 'prop-types';

export const ShapeTodo = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
