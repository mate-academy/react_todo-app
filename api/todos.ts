import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodo = (userId: number, title: string) => {
  return client.post<Todo>('/todos', {
    userId,
    title,
    completed: false,
  });
};

export const removeTodo = (todo: Todo) => {
  return client.delete(`/todos/${todo.id}`);
};

export const patchTodo = (todoId:number, title: string, completed: boolean) => {
  return client.patch<Todo>(`/todos/${todoId}`, {
    title,
    completed,
  });
};
