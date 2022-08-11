import { Todo } from '../type';

const BASE_URL = 'https://mate.academy/students-api/';

export const userId = 888;

export const request = (url: string, method?: RequestInit) => {
  return fetch(`${BASE_URL}${url}`, method)
    .then(response => response.json());
};

export const creatUser = () => {
  return request(
    'users',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id: userId,
        name: 'Alex',
        username: 'Destroyer3000',
        email: 'email@email.com',
        phone: 123456789,
      }),
    },
  );
};

export const getTodos = (): Promise<Todo[]> => {
  const todos = 'todos?userId=888';

  return request(todos);
};

export const deleteTodo = (TodoId: number) => {
  return request(`todos/${TodoId}`, { method: 'DELETE' });
};

export const addTodo = (NewTodo: Todo) => {
  return request(
    'todos',
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(NewTodo),
    },
  );
};

export const updateTodo = (
  TodoId: number,
  value: object,
) => {
  return request(
    `todos/${TodoId}`,
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(value),
    },
  );
};
