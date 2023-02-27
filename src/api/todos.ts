import { Todo } from '../types/Todo';
import { TodoToPost } from '../types/TodoToPost';
import { TodoToUpdate } from '../types/TodoToUpdate';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodoOnServer = (
  userId: number,
  newTodo: TodoToPost,
): Promise<Todo> => {
  return client.post<Todo>(`/todos?userId=${userId}`, newTodo);
};

export const updateTodoOnServer = (
  todoId: number,
  updatedTodo: TodoToUpdate,
): Promise<Todo> => {
  return client.patch<Todo>(`/todos/${todoId}`, updatedTodo);
};

export const deleteTodoOnServer = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
