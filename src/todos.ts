import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

type CreatedTodoArgs = Omit<Todo, 'id'>;

export const getTodos = (userId: number): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (data: CreatedTodoArgs) => {
  return client.post<Todo>('/todos', data);
};

export const removeTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = ({ id, ...todoData } : Todo) => {
  return client.patch<Todo>(`/todos/${id}`, todoData);
};
