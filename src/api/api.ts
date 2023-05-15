import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodoOnServer = (data: Todo) => {
  return client.post('/todos', data);
};

export const addUser = (data: User) => {
  return client.post<User>('/users', data);
};

export const getUsers = (url: string) => {
  return client.get<User[]>(url);
};

export const getUser = (userId: string) => {
  return client.get<User>(`/users/${userId}`);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const completeTodo = (todoId: number, data: boolean) => {
  return client.patch(`/todos/${todoId}`, { completed: data });
};

export const renameTodo = (todoId: number, title: string) => {
  return client.patch(`/todos/${todoId}`, { title });
};
