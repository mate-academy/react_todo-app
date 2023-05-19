import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createNewTodo = (userId: number, title: string) => {
  return client.post<Todo>(`/todos?userId=${userId}`, {
    title,
    userId,
    completed: false,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodo = (todoId: number, data: Partial<Todo>) => {
  return client.patch(`/todos/${todoId}`,
    {
      ...data,
    });
};
