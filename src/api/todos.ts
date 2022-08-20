import { client } from './axios';
import Todo, { TodoPatch } from '../types/Todo';

export const getTodos = () => {
  return client.get<Todo[]>('/todos');
};

export const createTodo = (todo: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', todo);
};

export const patchTodo = (todo: TodoPatch) => {
  return client.patch<Todo>(`/todos/${todo.id}`, todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
