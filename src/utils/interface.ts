export interface Todo {
  title: string;
  id: number;
  completed: boolean;
}

export interface State {
  todos: Todo[];
  todoEdit: number;
  todofilter: string;
  todoToggleAll: boolean;
}
