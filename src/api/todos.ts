import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (userId: number, newTodo: Todo) => {
  return client.post<Todo>(`/todos?userId=${userId}`, newTodo);
};

export const updateTodo = (
  userId: number,
  todoId: number,
  title: string,
) => {
  return client.patch<Todo>(`/todos/${todoId}?userId=${userId}`, { title });
};

export const deleteTodo = (userId: number, todoId: number) => {
  return client.delete(`/todos/${todoId}?userId=${userId}`);
};

export const toogleTodo = (
  userId: number,
  todoId: number,
  completed: boolean,
) => {
  return client.patch<Todo>(`/todos/${todoId}?userId=${userId}`, { completed });
};
