import { Todo } from '../types/Todo';
import { TodoUpdate } from '../types/TodoUpdate';
import { User } from '../types/User';
import { UserResponse } from '../types/UserResponse';
import { client } from '../utils/fetchClient';

export const createUser = (data: User) => {
  return client.post<User>('/users', data);
};

export const getUser = (userId: number) => {
  return client.get<UserResponse>(`/users/${userId}`);
};

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: TodoUpdate) => {
  return client.patch(`/todos/${todoId}`, data);
};
