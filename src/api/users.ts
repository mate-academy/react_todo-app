const API_URL = 'https://mate.academy/students-api/users';

export const USER_ID = 2451;

const user = {
  name: 'Valerie Troitska',
  username: 'trtskvalerie',
  email: 'val@mymail.moc',
  phone: '800851337',
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL}/${userId}`);

  return response.ok ? response.json() : null;
};

export const postUser = async (): Promise<User> => {
  const response = await fetch(API_URL, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'POST',
    body: JSON.stringify(user),
  });

  return response.json();
};
