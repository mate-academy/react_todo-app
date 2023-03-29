import { Property } from '../types/Property';
import { Todo } from '../types/Todo';
import { client } from '../utils';

export const USER_ID = 6657;
export const links = ['All', 'Active', 'Completed'];

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodo = (userId: number, todo: Omit<Todo, 'id'>)
: Promise<Todo> => {
  return client.post(`/todos?userId=${userId}`, todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodo = (
  todoId: number,
  data: Property,
): Promise<Todo> => {
  return client.patch(`/todos/${todoId}`, data);
};
