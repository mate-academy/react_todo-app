import { filterUtils } from './filterUtils';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case filterUtils.FILTER.ALL: {
      return todos;
    }

    case filterUtils.FILTER.ACTIVE: {
      return todos.filter(todo => !todo.completed);
    }

    case filterUtils.FILTER.COMPLETED: {
      return todos.filter(todo => todo.completed);
    }

    default: {
      return todos;
    }
  }
};

export const todosUtils = {
  getVisibleTodos,
};
