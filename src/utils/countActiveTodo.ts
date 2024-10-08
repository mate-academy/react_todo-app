import { Todo } from '../types/Todo';

export const countActiveTodo = (todos: Todo[]) => {
  return todos.reduce((count, todo) => count + Number(!todo.completed), 0);
};
