import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const USER_ID = 9922;

export const getUser = (userId: number) => {
  return client.get<User>(`/users/${userId}`);
};

export const postUser = (data: User) => {
  return client.post<User>('/users', data);
};
