import PropTypes from 'prop-types';

const TodoShape = {
  id: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const TodoItemTypes = {
  todo: PropTypes.object.isRequired,
  destroyTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  handleTodoTitleEdit: PropTypes.func.isRequired,
};

export const TodoListTypes = {
  todoList: PropTypes.arrayOf(PropTypes.objectOf(TodoShape)),
  destroyTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  changeStatusAll: PropTypes.func.isRequired,
  handleTodoTitleEdit: PropTypes.func.isRequired,
};

export const TodoFormTypes = {
  AddTodo: PropTypes.func.isRequired,
};

export const TodoFiltersTypes = {
  completedTodosSorting: PropTypes.func,
  completedAppears: PropTypes.func,
  allTodosToShowSorting: PropTypes.func,
  nonCompletedCount: PropTypes.func,
  nonCompletedTodosSorting: PropTypes.func,
};
