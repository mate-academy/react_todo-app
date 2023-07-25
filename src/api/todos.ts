import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (userId: number | undefined, query: string) => {
  return client.post<Todo>(`/todos?userId=${userId}`, {
    title: query,
    completed: false,
    userId,
  });
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodos = (todoId: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};
