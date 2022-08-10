import { TodoState } from './TodoState';

export interface Todo {
  id: number,
  title?: string,
  state?: TodoState,
}
