export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface State {
  todos: Todo[];
  filterBy: Filter;
}

// export type AddTodo = (newTodo: Todo) => void;
// export type RemoveTodo = (id: number) => void;
// export type EditTodo = (id: number, newText: string) => void;
