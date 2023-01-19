import { Todo } from '../types/Todo';

export const titleChanger = (
  todosToForm: Todo[],
  oldTodo: Todo,
  newTitle: string,
) => {
  if (!newTitle.trim()) {
    return todosToForm
      .filter(todo => todo.id !== oldTodo.id);
  }

  return todosToForm.map(todo => (
    (todo.id === oldTodo.id) ? { ...todo, title: newTitle } : todo
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
