import PropTypes from 'prop-types';

export const TodoListShape = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired).isRequired,
  handleChecked: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};
