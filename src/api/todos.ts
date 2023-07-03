import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getTodo = (id: number): Promise<Todo> => {
  return client.get<Todo>(`/todos/${id}`);
};

export const createTodo = (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  return client.post('/todos', newTodo);
};

export const removeTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const refreshTodo = ({
  id, title, completed, userId,
}: Todo) => {
  return client.patch(`/todos/${id}`, { title, completed, userId });
};
