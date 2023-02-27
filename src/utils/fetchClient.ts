import { RequestMethod } from '../enums/RequestMethod';

const BASE_URL = 'https://mate.academy/students-api';

function request<T>(
  url: string,
  method: RequestMethod = RequestMethod.GET,
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => {
    return request<T>(url, RequestMethod.POST, data);
  },
  patch: <T>(url: string, data: unknown) => {
    return request<T>(url, RequestMethod.PATCH, data);
  },
  delete: (url: string) => request(url, RequestMethod.DELETE),
};
