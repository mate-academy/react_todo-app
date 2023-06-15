import { PatchTodo } from '../types/PatchTodo';
import { Todo, NewTodo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 10319;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodos = (data: NewTodo) => {
  return client.post<Todo>('/todos', data);
};

export const patchTodos = (id: number, data: PatchTodo) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
