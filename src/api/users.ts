import { User, UserData } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUserByEmail = async (email: string) => {
  const users = await client.get<User[]>(`/users?email=${email}`);

  return users[0] || null;
};

export const createUser = async ({ email, name }: UserData) => {
  return client.post<User>('/users', { email, name });
};
