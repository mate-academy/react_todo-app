import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodos = (
  url:string,
  data:Pick<Todo, 'userId' | 'title' | 'completed'>,
) => {
  return client.post<Todo>(url, data);
};

export const deleteTodo = (todoId:number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (id:number, data:object) => {
  return client.patch(`/todos/${id}`, data);
};
