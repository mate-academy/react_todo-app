import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get('/users');
};
