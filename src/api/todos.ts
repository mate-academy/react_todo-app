import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { NewTodo } from '../types/NewTodo';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getPostTodos = (userId: number, data: NewTodo) => {
  return client.post<Todo[]>(`/todos?userId=${userId}`, data);
};

export const deleteTodos = (userId: number) => {
  return client.delete(`/todos/${userId}`);
};

export const updateTodo = (id: number, data: object) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
