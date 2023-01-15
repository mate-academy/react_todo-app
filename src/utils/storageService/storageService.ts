import { User } from '../../types/User';

export const set = (key: string, value: User) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const get = (key: string) => localStorage.getItem(key);

export const clear = (key: string) => {
  localStorage.removeItem(key);
};
