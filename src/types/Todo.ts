import { Filter } from './Filter';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  filter?: Filter;
};
