import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export const createTodo = (todo: Partial<Todo>) => {
  return client.post<Todo>('/todos', todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodo = (todoId: number, completed: boolean) => {
  return client.patch(`/todos/${todoId}`, { completed });
};

export const updateTodo = (todoId: number, updateData: Partial<Todo>) => {
  return client.patch(`/todos/${todoId}`, updateData);
};
