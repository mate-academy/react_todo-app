import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (userId: number, title: string) => {
  return client.post<Todo>('/todos', {
    title,
    userId,
    completed: false,
  });
};

export const deleteTodo = (todoId:number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateStatusTodo = (todoId:number, status:boolean) => {
  return client.patch(`/todos/${todoId}`, { completed: status });
};

export const updateTitleTodo = (todoId:number, title:string) => {
  return client.patch(`/todos/${todoId}`, { title });
};
