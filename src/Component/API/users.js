import { BASE_URL, userSetUpName } from './api';

const post = (url, data) => {
  fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    })
    .then(result => result.data);
};

export const addUser = () => {
  post('/users', {
    name: 'Sasha',
    username: userSetUpName,
    email: 'mate@example.com',
    phone: '1234567890',
  });
};

export async function getUserId(userName) {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();

  return (result.data.filter(user => (user.username)
    && user.username.localeCompare(userName) === 0))[0];
}

export const removeUser = (todoId) => {
  fetch(`${BASE_URL}/users/${todoId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    })
    .then(result => result.data);
};

// export const addTodo = ({ userId, title }) => {
//   post('/todos', {
//     userId,
//     title,
//     completed: false,
//   });
// };
