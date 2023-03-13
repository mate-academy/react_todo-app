import { Todo } from '../types/Todo';

export const filteredTodos = (
  todos: Todo[], filter: string,
) => {
  switch (filter) {
    case '' || 'All':
      return [...todos];

    case 'Active':
      return todos.filter(todo => !todo.completed);

    case 'Completed':
      return todos.filter(todo => todo.completed);

    default:
      return [...todos];
  }
};
