const BASE_URL = 'https://mate.academy/students-api/users';

export const getUsers = () => {
  return fetch(`${BASE_URL}`)
    .then(res => res.json());
};

export const deleteUser = (userId: number) => {
  return fetch(`${BASE_URL}/${userId}`, {
    method: 'DELETE',
  });
};

export const postUser = (
  name: string,
  username: string,
  email: string,
) => {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name,
      username,
      email,
    }),
  });
};
