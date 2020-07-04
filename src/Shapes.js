import PropTypes from 'prop-types';

export const HeaderShape = PropTypes.shape({
  addTodo: PropTypes.func,
});

export const TodoShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  checkedTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
});

export const TodoInputShape = PropTypes.shape({
  addTodo: PropTypes.func,
});

export const TodoListShape = PropTypes.shape({
  todos: PropTypes.arrayOf(TodoShape.isRequired),
  checkedTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
});

export const ToggleAllShape = PropTypes.shape({
  toggleAll: PropTypes.func,
});

export const TodosFilterShape = PropTypes.shape({
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
});

export const FooterShape = PropTypes.shape({
  todos: PropTypes.arrayOf(TodoShape.isRequired),
  clearCompleted: PropTypes.func,
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
});
