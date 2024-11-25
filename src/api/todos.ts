import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// Your userId is 1414
// Please use it for all your requests to the Students API. For example:
// https://mate.academy/students-api/todos?userId=1414

export const getTodos = (userid: number) => {
  return client.get<Todo[]>(`/todos?userId=${userid}`);
};

export function deleteTodo(todoId: number) {
  return client.delete(`/todos/${todoId}`);
}

export function createTodo({ title, userId, completed }: Omit<Todo, 'id'>) {
  return client.post<Todo>('/todos', { title, userId, completed });
}

export function updateTodo({ id, title, completed, userId }: Todo) {
  return client.patch<Todo>(`/todos/${id}`, { title, completed, userId });
}
