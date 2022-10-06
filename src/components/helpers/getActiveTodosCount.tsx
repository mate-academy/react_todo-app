import { Todo } from '../../types/todo';

export const getActiveTodosCount = (todos: Todo[]): number => {
  return todos.filter(todo => {
    return !todo.completed;
  }).length;
};
