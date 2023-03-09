import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const completeTodo = (id: number, data: boolean) => {
  return client.patch(`/todos/${id}`, { completed: data });
};

export const editTodo = (id: number, data: string) => {
  return client.patch(`/todos/${id}`, { title: data });
};
