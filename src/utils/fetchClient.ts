import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type DataType = Omit<User, 'id'> | Partial<Todo> | null;

const request = async <T>(
  url: string,
  method: RequestMethod,
  data: DataType = null,
): Promise<T> => {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

export const client = {
  get: <T>(url: string) => request<T>(url, 'GET'),
  post: <T>(url: string, data: DataType) => request<T>(url, 'POST', data),
  remove: <T>(url: string) => request<T>(url, 'DELETE'),
  patch: <T>(url: string, data: DataType) => request<T>(url, 'PATCH', data),
};
