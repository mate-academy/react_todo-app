import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const addTodo = (todo: Todo): Promise<Todo> => {
  return client.post('/todos/', todo);
};

export const changeTodo = (todoId: number, data: any) => {
  return client.patch(`/todos/${todoId}`, data);
};
