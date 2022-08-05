const BASE_URL = 'https://mate.academy/students-api';

type Option = {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
  headers?: {
    'Content-Type': 'application/json',
  },
  body?: string,
};

export const response = (
  url: string,
  option: Option = { method: 'GET' },
  res?: any,
) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(data => data.json())
    .then((data) => {
      if (res) {
        res(data.id);
      }

      return data;
    })
    .catch((error) => [error]);
};
