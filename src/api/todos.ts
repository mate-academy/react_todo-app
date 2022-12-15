import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (todo: Todo) => {
  return client.post<Todo[]>('/todos', todo);
};

export const removeTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todo: Todo) => {
  return client.patch<Todo[]>(`/todos/${todo.id}`, todo);
};
