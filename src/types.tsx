export type Todo = {
  id: string,
  title: string,
  completed: boolean,
};

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type State = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  addNewTodo: (todo: Todo) => void,
  filterTodos: (status: Status) => Todo[],
  toggleAll: () => void,
  clearAllCompleted: () => void,
  toggleTodo: (id: string) => void,
  removeTodo: (id: string) => void,
  editTodo: (id: string, newTitle: string) => void,
};
