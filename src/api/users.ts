import { client } from '../utils/fetchClient';
import { Users } from '../types/Users';

export const getUser = async (email: string) => {
  const users = await client.get<Users[]>(`/users?email=${email}`);

  return users[0] || null;
};

type Data = Pick<Users, 'name' | 'email'>;

export const addUser = async ({ email, name }: Data) => {
  return client.post<Users>('/users', { email, name });
};
