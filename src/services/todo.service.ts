import { Todo } from '../models/Todo';
// eslint-disable-next-line import/no-cycle
import { StatusTodoList } from '../context/todo.context';

export const getTodosByStatus = (todos: Todo[], status: StatusTodoList) => {
  return todos.filter(
    todo => {
      switch (status) {
        case StatusTodoList.Active:
          return !todo.completed;

        case StatusTodoList.Completed:
          return todo.completed;

        case StatusTodoList.All:
        default:
          return true;
      }
    },
  );
};

export interface TodosStats {
  todosTotal: number,
  todosLeft: number,
  todosCompleted: number,
}

export const getTodosStats = (todos: Todo[]): TodosStats => {
  const todosTotal = todos.length;
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const todosCompleted = todos.filter(todo => todo.completed).length;

  return {
    todosTotal,
    todosLeft,
    todosCompleted,
  };
};
