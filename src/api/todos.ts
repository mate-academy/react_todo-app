import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3595;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export function createTodo({ title, userId, completed }: Omit<Todo, 'id'>) {
  return client.post<Todo>('/todos', { title, userId, completed });
}

export function deleteTodos(todoId: number) {
  return client.delete(`/todos/${todoId}`);
}

export function deleteCompletedTodos(ids: number[]) {
  return Promise.allSettled(ids.map(id => client.delete(`/todos/${id}`)));
}

export function updateTodos({ title, userId, completed, id }: Todo) {
  return client.patch<Todo>(`/todos/${id}`, { title, userId, completed });
}
