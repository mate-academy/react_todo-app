export enum Status {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosContextType {
  todos: Todo[];
  status: Status;
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}
