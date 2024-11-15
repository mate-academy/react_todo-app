import { Todo } from '../../types/Todo';

export const revomesTodosById = (todos: Todo[], ids: string[]) =>
  todos.filter(({ id }) => !ids.includes(id));
