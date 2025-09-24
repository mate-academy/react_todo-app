import { Todos } from '../Types/Task';

export const updateTodoToLocalStorage = (tasks: Todos[]) => {
  localStorage.setItem('todos', JSON.stringify(tasks));
};
