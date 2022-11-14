import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = async (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addNewTodo = async (todo: Todo) => {
  return client.post<Todo[]>('/todos', todo);
};

export const deleteTodo = async (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const checkboxTodo = async (todoId: number, completed: boolean) => {
  return client.patch<Todo[]>(`/todos/${todoId}`, { completed });
};

export const changeTitles = async (todoId: number, title: string) => {
  return client.patch<Todo[]>(`/todos/${todoId}`, { title });
};
