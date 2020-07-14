import PropTypes from 'prop-types';

export const TodoListShape = PropTypes.shape({
  generalList: PropTypes.arrayOf(PropTypes.shape({
    task: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  checkBoxId: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChecked: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  handleClearTask: PropTypes.func.isRequired,
  handleMarkAll: PropTypes.func.isRequired,
  isTouched: PropTypes.bool.isRequired,
});
