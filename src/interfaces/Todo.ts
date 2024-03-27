import { Status } from '../units/units';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export interface StartTodos {
  todos: Todo[];
  filter: Status.All | Status.Completed | Status.Active;
}
