export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export interface Todos {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  onDeleteTodo: (id: number) => void,
  onUpdateTodos: (updatedTodo: Todo) => void,
  completedTodos: Todo[],
  uncompletedTodos: Todo[],
  onToggleAll: () => void,
}
