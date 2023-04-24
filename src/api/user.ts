import { UserResponce } from '../types/UserResponse';
import { client } from '../utils/fetchClient';

export const getUser = (userId: number) => {
  return client.get<UserResponce>(`/users/${userId}`);
};
