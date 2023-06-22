import { Todo } from './types/Todo';
import { User } from './types/User';
import { client } from './utils/fetchClient';

type NewTodo = {
  userId: number,
  title: string,
  completed: boolean,
};

export const getUser = (userId: number) => {
  return client.get<User>(`/users/${userId}`);
};

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (data: NewTodo) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const toggleCompleted = (todoId: number, completed: boolean) => {
  return client.patch(`/todos/${todoId}`, { completed });
};

export const updateTodoTitle = (todoId: number, title: string) => {
  return client.patch(`/todos/${todoId}`, { title });
};
