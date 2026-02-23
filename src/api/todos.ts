import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3881;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });
};

export const changeTodoStatus = (id: number, newState: boolean) => {
  return client.patch<Todo>(`/todos/${id}`, {
    completed: newState,
  });
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const editTodo = (id: number, title: string) => {
  return client.patch<Todo>(`/todos/${id}`, {
    title,
  });
};

// Add more methods here
