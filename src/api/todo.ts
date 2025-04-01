import { TodoType } from '../types/TodoType';
import { client } from '../utils/fetchClient';

export const USER_ID = 2480;

export const getTodos = () => {
  return client.get<TodoType[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (title: string) => {
  return client.post<TodoType>(`/todos`, {
    userId: USER_ID,
    title: title,
    completed: false,
  });
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const updateTodo = (todo: TodoType) => {
  return client.patch<TodoType>(`/todos/${todo.id}`, todo);
};
