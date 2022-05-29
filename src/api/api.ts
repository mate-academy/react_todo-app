// eslint-disable-next-line max-len
export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, method?: RequestInit | undefined) => {
  return fetch(`${BASE_URL}${url}`, method)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
};

export const getUser = (username: string) => {
  return request(`/users?username=${username}`);
};

export const newUser = (
  name: string,
  username: string,
  email: string,
  phone: string,
) => {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify({
      name,
      username,
      email,
      phone,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const createTodo = (
  userId: number,
  title: string,
) => {
  return request('/todos', {
    method: 'POST',
    body: JSON.stringify({
      title,
      userId,
      completed: false,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const getTodos = (userId: number) => {
  return request(`/todos?userId=${userId}`);
};

export const deleteTodo = (todoId?: number) => {
  return request(`/todos/${todoId}`, {
    method: 'DELETE',
  });
};

export const editTodo = (todoId: number, value: unknown) => {
  return request(`/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify(value),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
