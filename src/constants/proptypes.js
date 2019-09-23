import PropTypes from 'prop-types';

export const TodoNewTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const TodoShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const TodoItemTypes = {
  htmlFor: PropTypes.string.isRequired,
  removeTodo: PropTypes.func.isRequired,
  switchCompleted: PropTypes.func.isRequired,
  handleTodoTitleEdit: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const TodoListTypes = {
  todoList: PropTypes.arrayOf(PropTypes.objectOf(TodoShape)).isRequired,
  removeTodo: PropTypes.func.isRequired,
  switchCompleted: PropTypes.func.isRequired,
  handleTodoTitleEdit: PropTypes.func.isRequired,
};
