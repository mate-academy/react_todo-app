import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3465;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = ({ title, userId, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', { title, userId, completed });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: object) => {
  return client.patch(`/todos/${todoId}`, data);
};
