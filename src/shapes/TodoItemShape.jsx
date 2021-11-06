import PropTypes from 'prop-types';

export const TodoItemShape = {
  id: PropTypes.number,
  completed: PropTypes.bool,
  title: PropTypes.string,
  handleChecked: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};
