import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTODOs = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getCompletedTODOs = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}&completed=true`);
};

export const postTODO = (data: Todo) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTODO = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTODOstatus = (todoId: number, status: boolean) => {
  return client.patch(`/todos/${todoId}`, { completed: status });
};

export const updateTODOtitle = (todoId: number, title: string) => {
  return client.patch(`/todos/${todoId}`, { title });
};
