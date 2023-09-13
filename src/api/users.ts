import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const createUser = (user: Omit<User, 'id'>) => {
  return client.post<User>('/users', user);
};

export const getUser = (email: string) => {
  return client.get<User[]>(`/users?email=${email}`);
};
