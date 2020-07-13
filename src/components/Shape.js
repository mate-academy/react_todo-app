import PropTypes, { object } from 'prop-types';

export const HeaderShape = {
  addTodo: PropTypes.func.isRequired,
};

export const TodoListShape = {
  todos: PropTypes.arrayOf(object).isRequired,
  filter: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
};

export const TodoShape = {
  todo: PropTypes.shape({
    check: PropTypes.func.isRequired,
    deleteTodo: PropTypes.funs.isRequired,
    id: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
};

export const FooterShape = {
  todos: PropTypes.arrayOf(object).isRequired,
  filterTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
