import PropTypes from 'prop-types';

export const TodoItemTypes = {
  id: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onChangeCurrentTask: PropTypes.func.isRequired,
};
