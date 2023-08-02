import { TodoType } from './Todo';

export type TodosMap = {
  all: TodoType[];
  completed: TodoType[];
  active: TodoType[];
};
