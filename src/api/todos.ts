import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (title: string, userId: number) => {
  return client.post<Todo>('/todos', {
    title,
    userId,
    completed: false,
  });
};

export const changeTodo = (todoId: number, value: {}) => {
  return client.patch(`/todos/${todoId}`, value);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
