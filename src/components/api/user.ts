import { request } from './api';

export const myUserId = 4063;

export const getUser = () => (
  request(`/users/${myUserId}`)
);
