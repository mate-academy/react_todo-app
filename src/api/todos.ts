import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1781;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const addTodo = (title: string) => {
  return client.post(`/todos`, { title, userId: USER_ID, completed: false });
};

export const toggleTodo = (id: number, status: boolean) => {
  return client.patch(`/todos/${id}`, { completed: !status });
};

export const editTodo = (id: number, title: string) => {
  return client.patch(`/todos/${id}`, { title });
};
