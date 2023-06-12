import { NewTodo } from '../type/NewTodo';
import { Todo } from '../type/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getTodosPost = (userId: number, data: NewTodo) => {
  return client.post(`/todos?userId=${userId}`, data);
};

export const deleteTodo = (userId: number) => {
  return client.delete(`/todos/${userId}`);
};
