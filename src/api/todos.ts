import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3117;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addNewTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (
  todoId: number,
  data: Omit<Todo, 'id' | 'userId'>,
) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};

// Add more methods here
