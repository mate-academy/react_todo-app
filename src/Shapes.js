import PropTypes from 'prop-types';

export const ShapeTodo = PropTypes.shape({
  hideActive: PropTypes.bool.isRequired,
  hideCompleted: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
});
