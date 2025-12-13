import { FilterTodo } from '../types/FilterTodo';
import { Todo } from '../types/Todo';

export const filterTodo = (todos: Todo[], filterBy: FilterTodo) => {
  switch (filterBy) {
    case 'active': {
      return [...todos].filter(todo => !todo.completed);
    }

    case 'completed': {
      return [...todos].filter(todo => todo.completed);
    }

    default: {
      return [...todos];
    }
  }
};
