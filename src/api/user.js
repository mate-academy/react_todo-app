import { BASE_URL } from './api';

export async function createUser() {
  const user = await fetch(`${BASE_URL}/users/`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Alex',
      username: 'Ivannikov',
      email: 'alexii.ivannikov@gmail.com',
      phone: '344556677',
    }),
  });

  const response = await user.json();
  const result = await response.data;

  return result;
}

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users/`);
  const result = await response.json();
  const users = await result.data;

  return users;
}

export async function getUser(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  const result = await response.json();
  const usersId = await result.data;

  return usersId;
}
