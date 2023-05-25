import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export type AddTodoRequest = Omit<Todo, 'id'>;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodo = (request: AddTodoRequest) => {
  return client.post<Todo>('/todos', request);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodoStatus = (todoId: number, completed: boolean) => {
  return client.patch<Todo>(`/todos/${todoId}`, { completed });
};

export const updateTodoTitle = (todoId: number, title: string) => {
  return client.patch<Todo>(`/todos/${todoId}`, { title });
};
