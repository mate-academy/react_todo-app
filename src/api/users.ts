import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const createUser = (newUser: User) => {
  return client.post<User>('/users', newUser);
};
