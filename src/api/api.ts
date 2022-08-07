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
) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(data => data.json())
    .catch((error) => [error]);
};
