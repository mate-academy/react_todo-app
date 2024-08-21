import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const loadTodosFromLocalStorage = (): Todo[] => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const filterTodos = (todos: Todo[], filterStatus: Filter): Todo[] => {
  switch (filterStatus) {
    case Filter.Active:
      return todos.filter(todo => !todo.completed);
    case Filter.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const toggleAllTodos = (
  todos: Todo[],
  allCompleted: boolean,
): Todo[] => {
  return todos.map(todo => ({
    ...todo,
    completed: !allCompleted || !todo.completed,
  }));
};

export const deleteCompletedTodos = (todos: Todo[]): Todo[] => {
  return todos.filter(todo => !todo.completed);
};
