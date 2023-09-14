import { StatusEnum } from './status.types';

export type TodoContextType = {
  todos: Todo[];
  visibleTodos: Todo[],
  addTodo: (todo: Todo) => void;
  editTodo: (id: number, value: string) => void;
  changeTodoStatus: (id: number, status: boolean) => void;
  toggleAllStatus: () => void,
  removeTodo: (id: number) => void;
  setFilter: (value: StatusEnum) => void;
  removeAllCompleted: () => void;
  filter: StatusEnum;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
