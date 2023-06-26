import { NewTodo, Todo } from '../types/Todo';
import { client } from '../utils/FetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (userId: number, data: NewTodo) => {
  return client.post<Todo>(`/todos?userId=${userId}`, data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (
  todoId: number,
  data: {
    completed?: boolean,
    title?: string,
  },
) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};
