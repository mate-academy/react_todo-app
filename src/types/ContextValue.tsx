import { Todo } from './Todo';

export type ContextValue = {
  todos: Todo[] | null,
  toggleAll: string,
  setTodos: (todos: Todo[]) => void,
  handlerToggleAll: () => void,
  onChangeTodo: (id: string, title: string) => void,
  validationTitle: (title: string) => string,
  addTodo: (title: string) => void,
  deleteTodo: (id: string) => void,
  checkedTodo: (id: string) => void,
  clearCompleted: () => void,
};
