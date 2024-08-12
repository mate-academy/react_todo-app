import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1129;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });
};

export const deleteTodo = (itemId: number) => {
  return client.delete(`/todos/${itemId}`);
};

export const updatedTodo = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}`, todo);
};
