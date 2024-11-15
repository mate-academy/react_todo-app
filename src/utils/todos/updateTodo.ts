import { Todo } from '../../types/Todo';

export const updateTodosCompleted = (todos: Todo[]) =>
  todos.map(todo => ({ ...todo, completed: !todo.completed }));
