import { getTodosFromLocalStorage } from './getTodosFromLocalStorage';
import { Todo } from '../types/Todo';

export const initialTodo = {
  newInputName: '',
  visibleTodos: getTodosFromLocalStorage() as Todo[],
};
