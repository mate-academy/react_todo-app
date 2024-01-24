export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: Todo[];
}

export interface TodoItemProps {
  todo: Todo;
}

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface TodosContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  toggleAllTodos: () => void;
  deleteTodo: (id: number) => void;
  clearCompletedTodos: () => void;
  editTodoTitle: (id: number, newTitle: string) => void;
  filterStatus: Status,
  setFilterStatus: (status: Status) => void;
}
