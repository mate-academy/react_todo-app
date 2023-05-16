const BASE_URL = 'https://mate.academy/students-api';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: object | null = null, // we can send any data to the server
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
        throw new Error(`Response status not OK ${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .catch(error => {
      throw new Error(`Request failed: ${error.message}`);
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: object) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: object) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
