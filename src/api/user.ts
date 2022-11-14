import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUserById = async (id: number) => {
  const user = await client.get<User>(`/users/${id}`);

  return user || null;
};
