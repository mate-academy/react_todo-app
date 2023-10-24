import { Todo } from './types';

export const filterTodos = (array: Todo[], type: string) => {
  switch (type) {
    case 'active':
      return array.filter(todo => !todo.completed);

    case 'completed':
      return array.filter(todo => todo.completed);

    default:
      return array;
  }
};
