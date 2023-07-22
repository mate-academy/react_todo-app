const BASE_URL = 'https://mate.academy/students-api';
const userId = 11065;

export const getUser = () => {
  return fetch(`${BASE_URL}/users/${userId}`, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos?userId=${userId}`, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const updateTodos = (
  todoId: number,
  data: { [key: string]: string | boolean },
) => {
  return fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const createTodos = (data: {
  [key: string]: string | boolean | number,
}) => {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const deleteTodos = (todoId: number) => {
  return fetch(`${BASE_URL}/todos/${todoId}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};
