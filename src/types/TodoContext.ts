import { Todo } from './Todo';

export type Context = {
  todos: Todo[];
  saveTodo: (todoTitle: string) => void;
};
