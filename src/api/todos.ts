import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodos = (todo: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', todo);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}?userId=$9968`);
};

export const updateTodos = (
  todoId: number, completed: boolean,
): Promise<Todo> => {
  return client.patch(`/todos/${todoId}?userId=$9968`, { completed });
};

export const renameTodos = (
  todoId: number, title: string,
): Promise<Todo> => {
  return client.patch(`/todos/${todoId}?userId=$9968`, { title });
};
