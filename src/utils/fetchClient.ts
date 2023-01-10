import { ErrorType } from '../types/ErrorType';
import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type Data = Record<string, string | boolean | number> | Todo | null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: Data) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: Data) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

export const errorMessage = (error: ErrorType) => {
  switch (error) {
    case ErrorType.Add:
      return 'Unable to add a todo';

    case ErrorType.Delete:
      return 'Unable to delete a todo';

    case ErrorType.Update:
      return 'Unable to update a todo';

    case ErrorType.Eempty:
      return 'Title can\'t be empty';

    default:
      return null;
  }
};
