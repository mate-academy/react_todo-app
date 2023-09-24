import { Query } from '../../helpers/Query';
import { Todo } from '../../helpers/Todo';

export const getPreparedTodos = (todos: Todo[], query: Query) => {
  switch (query) {
    case 'Active': {
      return [...todos].filter(todo => todo.completed === false);
    }

    case 'Completed': {
      return [...todos].filter(todo => todo.completed === true);
    }

    default:
      return [...todos];
  }
};
