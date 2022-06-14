import { BASE_URL } from './api';

export const createUser = (
  userId: number,
  name: string,
  email: string,
) => {
  return fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId,
      name,
      email,
    }),
  })
    .then(response => response.json());
};
