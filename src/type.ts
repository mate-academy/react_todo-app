export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type State = {
  todos: Todo[];
  countOfActiveTodos: number;
  visibleTodos: Todo[];
};
