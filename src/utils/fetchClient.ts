import { Todo } from "../types/Todo";

/* eslint-disable @typescript-eslint/no-explicit-any */
// const BASE_URL = 'https://mate.academy/students-api';
const KEY = 'todos';

// returns a promise resolved after a given delay
// function wait(delay: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

// To have autocompletion and avoid mistypes
// type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// function request<T>(
//   url: string,
//   method: RequestMethod = 'GET',
//   data: any = null, // we can send any data to the server
// ): Promise<T> {
//   const options: RequestInit = { method };

//   if (data) {
//     // We add body and Content-Type only for the requests with data
//     options.body = JSON.stringify(data);
//     options.headers = {
//       'Content-Type': 'application/json; charset=UTF-8',
//     };
//   }

//   // DON'T change the delay it is required for tests
//   return wait(100)
//     .then(() => fetch(BASE_URL + url, options))
//     .then(response => {
//       if (!response.ok) {
//         throw new Error();
//       }

//       return response.json();
//     });
// }

function getFromLocalStorage(): Todo[] {
  const strData = localStorage.getItem(KEY);

  if (typeof strData === 'string') {
    return JSON.parse(strData);
  }

  return [];
}

function postToLocalStorage(data: Todo) {
  const currentData = getFromLocalStorage();
  currentData.push(data);
  localStorage.setItem(KEY, JSON.stringify(data));
}

function patchToLocalStorage(newData: Todo) {
  const currentData = getFromLocalStorage();
  const updateData = currentData.map(data => {
    if (data.id !== newData.id) {
      return data;
    }

    return { ...data, ...newData };
  });
  localStorage.setItem(KEY, JSON.stringify(updateData));
}

function deleteFromLocalStorage(dataId: number) {
  const deleteData = getFromLocalStorage().filter(data => data.id !== dataId);
  localStorage.setItem(KEY, JSON.stringify(deleteData));
}

export const client = {
  get: getFromLocalStorage,
  post: postToLocalStorage,
  patch: patchToLocalStorage,
  delete: deleteFromLocalStorage,
};

// export const client = {
//   get: <T>(url: string) => request<T>(url),
//   post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
//   patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
//   delete: (url: string) => request(url, 'DELETE'),
// };
