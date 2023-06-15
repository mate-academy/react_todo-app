import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export function getFilteredTodos(todos: Todo[], filter: string) {
  const returnArr = [...todos];

  switch (filter) {
    case Filter.ACTIVE:
      return returnArr.filter(todo => !todo.completed);
    case Filter.COMPLETED:
      return returnArr.filter(todo => todo.completed);
    default:
      return returnArr;
  }
}
