import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  const todos = client.get<Todo[]>(`/todos?userId=${userId}`);

  return todos || null;
};

export const createNewTodo = (title: string, userId: number) => {
  const newTodo = {
    title,
    completed: false,
    userId,
  };

  return client.post('/todos', newTodo);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const changedTodo = (
  id: number,
  title: string | null,
  completed: boolean | null = null,
) => {
  if (title) {
    return client.patch(`/todos/${id}`, { title });
  }

  return client.patch(`/todos/${id}`, { completed });
};
