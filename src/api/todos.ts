import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (title: string, userId: number) => {
  return client.post<Todo>('/todos', {
    userId,
    title,
    completed: false,
  });
};

export const removeTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: object) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};
