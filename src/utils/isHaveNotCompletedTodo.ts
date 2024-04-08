import { Todo } from '../types/Todo';

export const isHaveNotCompletedTodo = (visibleTodos: Todo[]) =>
  visibleTodos.findIndex(todo => !todo.isCompleted) >= 0;
