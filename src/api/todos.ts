import { Todo, TodoUpdateData } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodos = (data: Todo) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodos = (
  todoId: number, data: TodoUpdateData,
) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};
