import { client } from '../utils/fetchClient';

import { User } from '../types/User';
import { Todo } from '../types/Todo';

export const getUsers = (email: string) => {
  return client.get<User[]>(`/users?email=${email}`);
};

export const addUsers = (email: string) => {
  return client.post<User>('/users', {
    name: null,
    email,
    phone: null,
  });
};

export const getTodos = (userId: string) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (data: Todo) => {
  return client.post<Todo[]>('/todos', data);
};

export const editTodos = (id: number, data: {}) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};
