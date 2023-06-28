import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (statusTodo: Status, todosArr: Todo[]) => {
  switch (statusTodo) {
    case Status.active:
      return todosArr.filter(todo => !todo.completed);
    case Status.completed:
      return todosArr.filter(todo => todo.completed);
    default:
      return todosArr;
  }
};
