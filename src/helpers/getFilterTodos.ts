import { Status } from '../type/Status';
import { Todo } from '../type/Todo';

const getFilterTodos = (filter: Status, todos: Todo[]) => {
  switch (filter) {
    case Status.active: {
      return [...todos].filter((todo) => !todo.completed);
    }

    case Status.completed: {
      return [...todos].filter((todo) => todo.completed);
    }

    default:
      return [...todos];
  }
};

export default getFilterTodos;
