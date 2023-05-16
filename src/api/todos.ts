import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { PatchingData } from '../types/PatchingData';

export const getTodos = (userId: number | null) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodos = (userId: number | null, data: Todo) => {
  return client.post<Todo>(`/todos?userId=${userId}`, data);
};

export const patchTodos = (id: number, data: PatchingData) => {
  return client.patch<Todo[]>(`/todos/${id}`, data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
