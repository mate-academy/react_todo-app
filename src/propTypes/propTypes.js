import PropTypes from 'prop-types';

export const appPropTypes = {
  todos: PropTypes.array.isRequired,
  match: PropTypes.objectOf(PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.shape({
      filter: PropTypes.string,
    })),
  })).isRequired,
};

export const headerPropTypes = {
  addTodo: PropTypes.func,
};

export const todoListProps = {
  todos: PropTypes.object.isRequired,
  completedLength: PropTypes.number.isRequired,
  todosLength: PropTypes.number.isRequired,
  togleAllComplete: PropTypes.func.isRequired,
};

export const todoItemPropTypes = {
  todo: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.boolean,
  })).isRequired,
  togleCompleteTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  changeTodoTitle: PropTypes.func,
};

export const footerPropTypes = {
  todosLength: PropTypes.number,
  completedLength: PropTypes.number,
  deleteAllCompleted: PropTypes.func,

};
