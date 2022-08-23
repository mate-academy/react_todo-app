const BASE_URL = 'https://mate.academy/students-api';

const request = (path: string, options?: RequestInit | undefined) => {
  return fetch(`${BASE_URL}/${path}`, options)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        ), 5000);
      }

      return response.json();
    });
};

export const getUser = (username: string) => {
  return request(`users?username=${username}`);
};

export const getTodos = (userId: number) => {
  return request(`todos?userId=${userId}`);
};

export const createUser = (
  name: string, username: string, email: string, phone: string,
) => {
  return request('users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name,
      username,
      email,
      phone,
    }),
  });
};

export const createTodo = (title: string, userId: number) => {
  return request('todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      userId,
      completed: false,
    }),
  });
};

export const deleteTodoFromServer = (todoId: number) => {
  return request(`todos/${todoId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const editTodo = (
  todoId: number, completed: boolean, title: string,
) => {
  return request(`todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      completed,
      title,
    }),
  });
};
