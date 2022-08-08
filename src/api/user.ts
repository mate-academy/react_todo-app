import { User } from '../types/User';
import { client } from './fetch';

export const createUser = (data: User) => {
  return client.post<User>('/users', data);
};

export const getUser = (userId: number) => {
  return client.get<User>(`/users/${userId}`);
};
