import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export const getVisibletodos = (todos: Todo[], status: TodoStatus) => {
  let visibleTodos = [...todos];

  if (status !== TodoStatus.all) {
    visibleTodos = visibleTodos.filter(todo => {
      return status === TodoStatus.active ? !todo.completed : todo.completed;
    });
  }

  return visibleTodos;
};
