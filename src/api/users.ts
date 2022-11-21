import { User } from '../types/User';
import { client } from '../utils/fetchClient';

type UserData = Pick<User, 'name' | 'email'>;

export const createUser = async ({ name, email }: UserData) => {
  return client.post<User>('/users', { name, email });
};

export const getUserByEmail = async (email: string) => {
  const users = await client.get<User[]>(`/users?email=${email}`);

  return users[0] || null;
};
