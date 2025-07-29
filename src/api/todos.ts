import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2516; //2516;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (newTodo: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, newTodo);
};

export const updateTodo = (updatedTodo: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${updatedTodo.id}`, updatedTodo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const getRejectedPromise = () => {
  return Promise.reject(new Error('some test error'));
};
