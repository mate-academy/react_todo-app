import PropTypes from 'prop-types';

export const MainShape = PropTypes.shape({
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  allCompleted: PropTypes.bool,
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
  checkAll: PropTypes.func,
  todosLength: PropTypes.number,
});

export const TodoFilterShape = PropTypes.shape({
  children: PropTypes.string,
  onClick: PropTypes.func,
  filterType: PropTypes.string,
});

export const FooterShape = PropTypes.shape({
  currentFilter: PropTypes.string,
  setFilter: PropTypes.func,
  onClear: PropTypes.func,
});

export const HeaderShape = PropTypes.shape({
  addTodo: PropTypes.func,
});

export const TodoItemShape = PropTypes.shape({
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
});

export const TodoListShape = PropTypes.shape({
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
});
