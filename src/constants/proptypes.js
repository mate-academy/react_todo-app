import PropTypes from 'prop-types';

export const NewTodoPropTypes = {
  onAdd: PropTypes.func.isRequired,
};

export const TodoListPropTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isCompleted: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  toggleTodoCompleteness: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export const TodosFilterPropTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isCompleted: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  filterIdentifier: PropTypes.string.isRequired,
  toggleFilterIdentifier: PropTypes.func.isRequired,
  removeCompletedTodos: PropTypes.func.isRequired,
};
