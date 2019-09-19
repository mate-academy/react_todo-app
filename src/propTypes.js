import propTypes from 'prop-types';

propTypes.state = {
  todo: propTypes.objectOf(propTypes.any),
  onCheck: propTypes.func,
  onRemove: propTypes.func,
  filteredTodoList: propTypes.arrayOf(propTypes.any),
  handleCheckAll: propTypes.func,
  deleteTodo: propTypes.func,
  handleTodoCheck: propTypes.func,
  todoList: propTypes.arrayOf(propTypes.any),
  filterArray: propTypes.arrayOf(propTypes.any),
  checkedAll: propTypes.bool,
  query: propTypes.string,
  selected: propTypes.string,
  handleChange: propTypes.func,
  addTodo: propTypes.func,
  deleteChecked: propTypes.func,
  filter: propTypes.func,
};
export default propTypes;
