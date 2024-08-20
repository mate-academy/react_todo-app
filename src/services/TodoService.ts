import { Todo } from '../types/Todo';

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const loadTodosFromLocalStorage = (): Todo[] => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const filterTodos = (todos: Todo[], filterStatus: string): Todo[] => {
  switch (filterStatus) {
    case 'Active':
      return todos.filter(todo => !todo.completed);
    case 'Completed':
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
