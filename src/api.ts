const USER_ID = 2474;
const BASE_URL = 'https://mate.academy/students-api';

export const getUserInfo = () => {
  const URL = `${BASE_URL}/users/${USER_ID}`;

  return fetch(URL)
    .then(res => res.json());
};

export const getTodos = () => {
  const URL = `${BASE_URL}/todos?userId=${USER_ID}`;

  return fetch(URL)
    .then(res => res.json());
};

export const addTodoToServer = (title: string) => {
  const URL = `${BASE_URL}/todos`;

  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      userId: USER_ID,
      completed: false,
    }),
  })
    .then(res => res.json());
};

export const removeTodoFromServer = (todoId: number) => {
  const URL = `${BASE_URL}/todos/${todoId}`;

  return fetch(URL, {
    method: 'DELETE',
  })
    .then(res => res.json());
};

export const updateTodoOnServer = (
  todoId: number,
  newValue: { [key: string]: string | boolean },
) => {
  const URL = `${BASE_URL}/todos/${todoId}`;

  return fetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newValue),
  })
    .then(res => res.json());
};
