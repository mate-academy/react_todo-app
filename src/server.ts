/* eslint-disable */
const BASE_URL = 'https://mate.academy/students-api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const requestP = new Promise(resolve => resolve);

  return requestP
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
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

// const client = {
//   get: (url: string) => request(url),
//   post: (url: string, data: any) => request(url, 'POST', data),
//   patch: (url: string, data: any) => request(url, 'PATCH', data),
//   delete: (url: string) => request(url, 'DELETE'),
// };

// export const getTodos = (userId: number) => {
//   return client.get<Todo[]>(`/todos?userId=${userId}`);
// };

// export const addTodos = (
//   url:string,
//   data:Pick<Todo, 'userId' | 'title' | 'completed'>,
// ) => {
//   return client.post<Todo>(url, data);
// };

// export const deleteTodo = (todoId:number) => {
//   return client.delete(`/todos/${todoId}`);
// };

// export const updateTodo = (id:number, data:object) => {
//   return client.patch(`/todos/${id}`, data);
// };
