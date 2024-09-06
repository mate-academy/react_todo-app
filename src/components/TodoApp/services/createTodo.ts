import { Todo } from '../../../types/Todo';

export const createTodo = (title: string): Todo => {
  return {
    id: +new Date(),
    title,
    completed: false,
  };
};
