import { Todo } from '../types/todo';

export const titleChanger = (
  todosToForm: Todo[],
  oldTitle: string,
  newTitle: string,
) => {
  if (!newTitle.trim()) {
    return todosToForm.filter(todo => todo.title !== oldTitle);
  }

  return todosToForm.map(todo => (
    (todo.title === oldTitle) ? { ...todo, title: newTitle } : todo
  ));
};

export const statusChanger = (
  todosToForm: Todo[],
  status: boolean,
) => {
  return todosToForm
    .map(todo => (
      (todo.completed === status) ? { ...todo, completed: !status } : todo
    ));
};
