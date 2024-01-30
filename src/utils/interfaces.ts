export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface State {
  todos: Todo[];
  todoEdit: number;
  todofilter: string;
  todoToggleAll: boolean;
}
