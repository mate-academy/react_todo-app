import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUser = (userId: number) => {
  return client.get<User>(`/users/${userId}`);
};

export const createUser = (
  data: Pick<User, 'name' | 'username' | 'email' | 'phone'>,
) => {
  return client.post<User>('/users', data);
};
