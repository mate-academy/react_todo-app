export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type TodosContextType = {
  todos: Todo[],
  updateTodo: (updatedTodo: Todo) => void,
  deleteTodo: (deletedTodo: Todo) => void,
  activeFilter: string,
  setActiveFilter: (filter: Status) => void,
};
