import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUserByEmail = async (email: string) => {
  const users: User[] = await client.get(`/users?email=${email}`);

  return users[0] || null;
};
