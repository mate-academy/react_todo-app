import { ToDo } from './ToDo';

export type State = {
  inputValue: string;
  allTodos: ToDo[] | [];
  activeButton: string;
};
