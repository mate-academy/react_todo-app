import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3316;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export function addTodo(title: string) {
  return client.post<Todo>(`/todos`, {
    userId: USER_ID,
    title,
    completed: false,
  });
}

export function updateCompleted(todoId: number, completed: boolean) {
  return client.patch<Todo>(`/todos/${todoId}`, { completed });
}

export function deleteTodo(todoId: number) {
  return client.delete(`/todos/${todoId}`);
}

export function updateTitle(todoId: number, title: string) {
  return client.patch<Todo>(`/todos/${todoId}`, { title });
}
