import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(`${BASE_URL}/todos`)
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
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(todo),
    }).then(response => response.json());
};
