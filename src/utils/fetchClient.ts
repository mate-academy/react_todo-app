const BASE_URL = 'https://mate.academy/students-api';

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const request = <T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> => {
  const options: RequestInit = { method };

  if (data) {
    options.headers = { 'content-type': 'application/json; charset=UTF-8' };
    options.body = JSON.stringify(data);
  }

  return wait(300)
    .then(() => fetch(`${BASE_URL}${url}`, options))
    .then(response => response.json());
};

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
