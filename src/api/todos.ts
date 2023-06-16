import { Todo, TodoToSend } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number | null) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodos = (todo: TodoToSend) => {
  return client.post<Todo>('/todos', todo);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (id: number, data: object) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
