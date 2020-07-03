import PropTypes from 'prop-types';

export const ShapeHeader = PropTypes.shape({
  value: PropTypes.string.isRequired,
  handleInputChange: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
});

export const ShapeToggler = PropTypes.shape({
  allSelected: PropTypes.bool.isRequired,
  selectAll: PropTypes.func.isRequired,
});

export const ShapeTodo = PropTypes.shape({
  hideActive: PropTypes.bool.isRequired,
  hideCompleted: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
});

export const ShapeTodoList = PropTypes.shape({
  todoList: PropTypes.arrayOf(PropTypes.string).isRequired,
  transformedTodo: PropTypes.string.isRequired,
  putChanges: PropTypes.func.isRequired,
  startEditing: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  allSelected: PropTypes.bool.isRequired,
  hideActive: PropTypes.bool.isRequired,
  hideCompleted: PropTypes.bool.isRequired,
  completedTodos: PropTypes.objectOf(PropTypes.bool).isRequired,
});

export const ShapeFooter = PropTypes.shape({
  todoList: PropTypes.arrayOf(PropTypes.string).isRequired,
  visibleFooter: PropTypes.bool.isRequired,
  selectedButton: PropTypes.string.isRequired,
  completedTodos: PropTypes.objectOf(PropTypes.bool).isRequired,
  showAll: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  clear: PropTypes.bool.isRequired,
});
