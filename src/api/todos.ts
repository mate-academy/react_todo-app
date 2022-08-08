/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(`${BASE_URL}/todos?userId=30`)
    .then(response => response.json());
};

export const deleteTodo = (todoId: number) => {
  return fetch(`${BASE_URL}/todos/${todoId}`,
    {
      method: 'DELETE',
    });
};

export const createTodo = (todo: Todo) => {
  return fetch(`${BASE_URL}/todos`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(todo),
    }).then(response => response.json());
};

export const patch = (url: string, data: any) => {
  return fetch(url,
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    }).then(response => response.json());
};

export const toggleTodoStatus = (todoId: number, completed: boolean) => {
  return patch(`${BASE_URL}/todos/${todoId}`, { completed });
};

export const editTodoTitle = (todoId: number, title: string) => {
  return patch(`${BASE_URL}/todos/${todoId}`, { title });
};
