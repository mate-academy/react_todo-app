import { FilterUtils } from './FilterUtils';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterUtils.FILTER.ALL: {
      return todos;
    }

    case FilterUtils.FILTER.ACTIVE: {
      return todos.filter(todo => !todo.completed);
    }

    case FilterUtils.FILTER.COMPLETED: {
      return todos.filter(todo => todo.completed);
    }

    default: {
      return todos;
    }
  }
};

export const TodosUtils = {
  getVisibleTodos,
};
