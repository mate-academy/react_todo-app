import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3505;
const TODOS_URL = '/todos';

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (todo: Omit<Todo, 'id'>) => {
  return client.post<Todo>(TODOS_URL, todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`${TODOS_URL}/${todoId}`);
};

export const patchTodo = (todoId: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`${TODOS_URL}/${todoId}`, data);
};

// Add more methods here
