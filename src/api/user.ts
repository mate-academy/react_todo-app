import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUser = (userId: number) => {
  return client.get<User>(`/users/${userId}`);
};

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const addUser = (user: User) => {
  const { id, name, email } = user;

  return client.post<User>('/users', { id, name, email });
};
