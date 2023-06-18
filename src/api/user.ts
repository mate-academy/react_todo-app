import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const USER_ID = 7033;

export const getUser = (userId: number) => {
  return client.get<User>(`/users/${userId}`);
};
