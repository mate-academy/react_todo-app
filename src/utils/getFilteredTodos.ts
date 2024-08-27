import { Actions } from '../types/Actions';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], action: Actions): Todo[] => {
  switch (action) {
    case Actions.ALL:
      return todos;

    case Actions.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case Actions.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
