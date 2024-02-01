export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface TodosContextType {
  query: string,
  setQuery: (query: string) => void,
  allTodos: Todo[],
  status: Status,
  setAllTodos: (todo: Todo[]) => void,
  setStatus: (status: Status) => void,
  handleToggle: (id: number) => void,
  handleDestroy: (id: number) => void,
  handleClearCompleted: () => void,
  toggleAll: () => void,
}

export interface TodoItemProps {
  todo: Todo;
}
