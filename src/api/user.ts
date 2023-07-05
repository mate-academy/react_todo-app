import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUser = (email: string) => {
  return client.get<User[]>(`/users?email=${email}`);
};

export const addUser = (user: Omit<User, 'id'>) => {
  return client.post<User>('/users', user);
};
