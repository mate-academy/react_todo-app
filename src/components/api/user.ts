import { request } from './api';

export const myUserId = 3883;

export const getUser = () => (
  request(`/users/${myUserId}`)
);
