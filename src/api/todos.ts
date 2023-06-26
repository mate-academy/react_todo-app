import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (userId: number, data: unknown) => {
  return client.post<Todo>(`/todos?userId=${userId}`, data);
};

export const deleteTodo = (userId: number) => {
  return client.delete(`/todos/${userId}`);
};

export const updateTodo = (userId: number, data: unknown) => {
  return client.patch<Todo>(`/todos/${userId}`, data);
};
