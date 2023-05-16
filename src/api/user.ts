import { client } from '../utils/fetchClient';
import { NewUser } from '../types/NewUser';

export const createUser = (data: NewUser) => {
  return client.post<NewUser>('/users', data);
};
