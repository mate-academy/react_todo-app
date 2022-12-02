/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number | undefined) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (
  userId: number | undefined, query: string,
) => {
  return client.post<Todo>(`/todos?userId=${userId}`, {
    title: query,
    completed: false,
    userId,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, object: any): Promise<Todo> => {
  return client.patch(`/todos/${todoId}`, object);
};
