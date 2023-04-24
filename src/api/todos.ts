import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTodo = (id: number) => {
  return client.delete<Todo>(`/todos/${id}`);
};

export const updateTodo = (id: number, data: object) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
