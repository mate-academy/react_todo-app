import PropTypes from 'prop-types';

export const TodoShapes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export const TodoAppShapes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    TodoShapes,
  )).isRequired,
};

export const AddFormShapes = {
  addTodo: PropTypes.func.isRequired,
};

export const TodosFilterShapes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    TodoShapes,
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

export const TodoMenuShapes = {
  activeTasks: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completedTasks: PropTypes.number.isRequired,
};

export const CompleteAllCheckboxShapes = {
  completeAll: PropTypes.func.isRequired,
};

export const TodoListShapes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    TodoShapes,
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
  }).isRequired,
};
