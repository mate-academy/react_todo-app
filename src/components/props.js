import PropTypes from 'prop-types';

export const commonProps = {
  toggleAll: PropTypes.bool.isRequired,
  changeToggle: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  changeTitle: PropTypes.func.isRequired,
};

export const todoShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});
