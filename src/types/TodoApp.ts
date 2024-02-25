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

export type StatusAction =
  | { type: 'all' }
  | { type: 'active' }
  | { type: 'completed' };
