import { Task } from './Task';

export interface Context {
  firstTask: boolean;
  setFirstTask: (_item: boolean) => void;
  todos: Task[];
  setTodoses: (todo: any) => void;
  filter: string;
  setFilter: (filtr: any) => void;
}
