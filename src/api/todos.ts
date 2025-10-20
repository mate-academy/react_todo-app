import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3557;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (title: string) => {
  const payload = {
    userId: USER_ID,
    title,
    completed: false,
  };

  return client.post<Todo>('/todos', payload);
};

export const removeTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const updateTodo = (
  id: number,
  data: Partial<Pick<Todo, 'title' | 'completed'>>,
) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
// Add more methods here
