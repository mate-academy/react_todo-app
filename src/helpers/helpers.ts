import { FilterParam } from '../types/FilterParam';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  param: string,
) => {
  const normalize = param.includes('/') ? param.slice(1) : param;

  return normalize !== FilterParam.All
    ? todos.filter(todo => {
      switch (normalize) {
        case FilterParam.Active:
          return !todo.completed;

        case FilterParam.Completed:
          return todo.completed;

        default:
          return todo;
      }
    })
    : todos;
};

export const counterOfActiveTodos = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed).length;
};

export const checkCompletedTodo = (todos: Todo[]) => {
  return todos.some(todo => todo.completed);
};
