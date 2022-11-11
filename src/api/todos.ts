import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

type TodoData = Pick<Todo, 'title' | 'completed' | 'userId'>;

export const getTodos = async (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = async (todoData: TodoData) => {
  return client.post<Todo>('/todos', todoData);
};

export const toggleTodo = async (todoId: number, completed: boolean) => {
  return client.patch<Todo>(`/todos/${todoId}`, { completed });
};

export const updateTodoTitle = async (todoId: number, title: string) => {
  return client.patch<Todo>(`/todos/${todoId}`, { title });
};

export const deleteTodo = async (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
