import axios from 'axios';
import { Todo } from './types/Todo';

axios.defaults.baseURL = 'http://localhost:3000';

export const getTodos = async () => {
  const response = await axios.get<Todo[]>('/todos');
  return response.data;
};

export const addTodo = async (title: string) => {
  const response = await axios.post<Todo>('/todos', { title });
  return response.data;
};

export const removeTodo = async (todoId: string) => {
  await axios.delete(`/todos/${todoId}`);
};

export const updateTodo = async (todo: Todo) => {
  const response = await axios.put<Todo>(`/todos/${todo.id}`, todo);
  return response.data;
};
