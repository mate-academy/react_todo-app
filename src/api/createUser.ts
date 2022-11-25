import { User } from '../types/User';
import { client } from '../utils/fetchClients';

type UserData = Pick<User, 'name' | 'email'>;

export const createUser = async ({ email, name }: UserData) => {
  return client.post<User>('/users', { email, name });
};
