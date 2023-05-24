import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodo = (userId: number, todo: Todo) => {
  return client.post<Todo>(`/todos?userId=${userId}`, todo);
};

export const deleteTodo = (userId: number, todoId: number) => {
  return client.delete(`/todos/${todoId}?userId=${userId}`);
};

export const updateTodo = (todoId: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};

export const changeTodos = (
  todos: Todo[],
  changedTodos: Todo[],
): Todo[] => {
  return todos.map(todo => {
    const toggledTodo = changedTodos.find(changedTodo => (
      changedTodo.id === todo.id
    ));

    return toggledTodo || todo;
  });
};

export const updateTodoTitle = (todoId: number, title: string) => {
  return client.patch<Todo>(`/todos/${todoId}`, { title });
};
