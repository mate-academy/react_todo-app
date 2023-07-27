import { TodoType } from './TodoType';

export type InitialStateType = {
  todos: TodoType[];
  itemsLeft: () => number;
  filter: string;
  getVisibleTodos: () => TodoType[] | [];
};
