import { Todos } from '../types/types';
import { Status } from './type-Filter';

export const filterTodo = (todos: Todos[], filter: Status): Todos[] => {
  switch (filter) {
    case Status.All:
      return todos;
    case Status.Active:
      return todos.filter(todo => !todo.completed);
    case Status.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
