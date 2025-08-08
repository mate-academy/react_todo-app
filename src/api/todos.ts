import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3235;

// eslint-disable-next-line @typescript-eslint/no-shadow
export const getTodos = (USER_ID: number) => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// eslint-disable-next-line @typescript-eslint/no-shadow
export const createTodo = (USER_ID: number, title: string) => {
  return client.post<Todo>('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};
