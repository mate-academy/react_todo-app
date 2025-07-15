import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2998;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = (newTodo: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, newTodo);
};

export const patchTodo = (todoId: number, updatedFields: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${todoId}`, updatedFields);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
 