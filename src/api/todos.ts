import { IPatchTodo } from 'types/PatchTodo';
import { ITodo, INewTodo } from 'types/Todo';
import { client } from 'utils/fetchClient';

export const USER_ID = 10319;

export const getTodos = (userId: number) => {
  return client.get<ITodo[]>(`/todos?userId=${userId}`);
};

export const postTodos = (data: INewTodo) => {
  return client.post<ITodo>('/todos', data);
};

export const patchTodos = (id: number, data: Partial<IPatchTodo>) => {
  return client.patch<ITodo>(`/todos/${id}`, data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
