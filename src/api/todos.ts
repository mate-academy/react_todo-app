import { Data } from '../types/Data';
import { Todo } from '../types/Todo';
import { client } from './fetch';

export const getUserTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const removeTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const editTodo = (todoId: number, data: Data) => {
  return client.patch(`/todos/${todoId}`, data);
};

export const createTodo = (data: Data) => {
  return client.post('/todos', data);
};
