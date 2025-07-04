import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3177;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodos = (data: Todo) => {
  return client.patch<Todo>(`/todos/${data.id}`, data);
};
