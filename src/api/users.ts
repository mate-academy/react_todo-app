import { User } from '../types/User';
import { client } from '../utils/fetchClient';

type UserData = Pick<User, 'name' | 'email'>;

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const users = await client.get<User[]>(`/users?email=${email}`);

  return users[0] || null;
};

export const createUser = async ({ email, name }: UserData) => {
  return client.post<User>('/users', { email, name });
};
