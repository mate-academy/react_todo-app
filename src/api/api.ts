import { Todo, User } from '../type';

const BASE_URL = 'https://mate.academy/students-api/';

export const request = async (url: string, method?: RequestInit) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, method);

    return await response.json();
  } catch {
    return Response.error();
  }
};

export const creatUser = async () => {
  return request(
    'users',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id: 888,
        name: 'Alex',
        username: 'Destroyer3000',
        email: 'email@email.com',
        phone: 123456789,
      }),
    },
  );
};

export const getUser = (): Promise<User> => {
  const endpoint = 'users/888';

  return request(endpoint);
};

export const getTodos = (): Promise<Todo[]> => {
  const endpoint = 'todos?userId=888';

  return request(endpoint);
};

export const deleteTodo = (TodoId: number) => {
  return request(`todos/${TodoId}`, { method: 'DELETE' });
};

export const addTodo = async (NewTodo: Todo) => {
  return request(
    'todos',
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(NewTodo),
    },
  );
};

export const updateTodo = async (
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
