import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (data: Todo) => {
  const { userId } = data;

  return client.post<Todo>(`/todos?userId=${userId}`, data);
};

export const patchTodo = (id: number, data: Partial<Todo>): Promise<Todo> => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

export const removeTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
