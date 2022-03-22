import { User } from '../types/user';

const usersAPI = 'https://mate.academy/students-api/users';
const userID = '2450';

export const getUser = async (): Promise<User> => {
  const user = await fetch(`${usersAPI}/${userID}`);

  return user.json();
};
