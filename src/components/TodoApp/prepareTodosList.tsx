import { Todo } from '../../types/Todo';

export function prepareTodosList(listOfTodos: Todo[], filterField: string) {
  return listOfTodos.filter(todo => {
    switch (filterField) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return todo;
    }
  });
}
