import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3117;

export const getTodos = () => {
  return client.get();
};

export const addNewTodo = (data: Todo | []) => {
  return client.post(data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: Omit<Todo, 'id'>) => {
  return client.patch(todoId, data);
};
