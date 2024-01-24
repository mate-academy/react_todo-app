import { Todo } from './Todo';

export type Context = {
  todos: Todo[],
  setTodos: (todosArr: Todo[]) => void,
};
