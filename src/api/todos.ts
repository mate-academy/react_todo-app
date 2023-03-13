import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (todo: Todo) => {
  const { title, userId, completed } = todo;

  return client.post<Todo>('/todos', { title, userId, completed });
};

export const removeTodo = (todoID: number) => {
  return client.delete(`/todos/${todoID}`);
};

export const updateTodo = (todoID: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${todoID}`, data);
};
