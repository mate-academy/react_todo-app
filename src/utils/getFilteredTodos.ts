import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';

export const filteredTodos = (todos: Todo[], status: Status) => {
  let copyTodo = [...todos];

  switch (status) {
    case Status.All:
      return copyTodo;
    case Status.Active:
      copyTodo = copyTodo.filter(todo => !todo.completed);
      break;
    case Status.Completed:
      copyTodo = copyTodo.filter(todo => todo.completed);
      break;
    default:
      return copyTodo;
  }

  return copyTodo;
};
