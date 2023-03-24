/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo } from '../types/Todo';
import { DataForUpdate } from '../types/DataForUpdate';
import { client } from '../utils/fetchClient';

type TodoForPost = {
  userId: number;
  title: string;
  completed: boolean;
};

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (data: TodoForPost) => {
  return client.post<Todo>('/todos', data);
};

export const updateTodo = (todoId: number, data: DataForUpdate) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
