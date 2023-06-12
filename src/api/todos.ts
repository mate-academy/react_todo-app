import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodo = (data: Todo) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTodo = (userId: number) => {
  return client.delete(`/todos/${userId}`);
};

export const patchTodo = (todoId: number,
  completed: boolean, title: string) => {
  return client.patch(`/todos/${todoId}`, { completed, title });
};
