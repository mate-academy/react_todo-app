import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUserByEmail = async (email: string) => {
  const users = await client.get<User []>(`/users?email=${email}`);

  return users[0] || null;
};

export const createdNewUser = async (name: string, email: string) => {
  return client.post<User>('/users', { name, email });
};
