import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUser = (email: string) => {
  return client.get<User[]>(`/users?email=${email}`);
};

export const createUser = (data: User) => {
  return client.post<User>('/users', data);
};
