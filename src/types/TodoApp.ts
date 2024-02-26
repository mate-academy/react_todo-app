export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoAction =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'clearCompletedTodos' }
  | { type: 'toggleStatus'; payload: number }
  | { type: 'toggleStatusAll' };

export enum Status {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export type StatusAction = { type: Status };
