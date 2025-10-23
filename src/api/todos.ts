import { PayloadProps } from '../types/PayloadProps';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3554;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = (todoId: number) => {
  return client.delete<number>(`/todos/${todoId}`);
};

export function addTodo(title: string) {
  const payload = {
    title,
    userId: USER_ID,
    completed: false,
  };

  return client.post<Todo>('/todos', payload);
}

export function editTodo(todoId: number, payload: PayloadProps) {
  return client.patch<Todo>(`/todos/${todoId}`, payload);
}
