const BASE_URL = 'https://mate.academy/students-api';

type Option = {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
  headers?: {
    'Content-Type': 'application/json',
  },
  body?: string,
};

export const response = (
  url: string,
  option: Option = { method: 'GET' },
) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(data => data.json());
};

export const postTodo = (title: string, userId: number) => response('/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title,
    userId,
    completed: false,
  }),
});

export const patchTodo = (
  todoId: number,
  key: string,
  value: string | boolean,
) => response(`/todos/${todoId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    [key]: value,
  }),
});

export const deleteTodo = (todoId: number) => response(`/todos/${todoId}`, { method: 'DELETE' });
