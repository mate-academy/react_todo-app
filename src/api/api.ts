const BASE_URL = 'https://mate.academy/students-api';

const request = (endpoint:string, option?:RequestInit) => {
  return fetch(`${BASE_URL}${endpoint}`, option)
    .then(response => {
      return response.ok
        ? response.json()
        : Promise.reject(new Error('error'));
    });
};

const post = (url:string, data: {}) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

const patch = (url:string, data: {}) => {
  return request(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const getTodos = () => request('/todos?userId=7777');

export const deleteTodoFromServer = (todoId:number) => request(`/todos/${todoId}`, { method: 'DELETE' });

export const addTodoToServer = (title:string) => {
  return post('/todos', {
    title,
    userId: 7777,
    completed: false,
  });
};

export const editTodoStatus = (todoId:number, completed:boolean) => {
  return patch(`/todos/${todoId}`, { completed });
};

export const editTodoTitle = (todoId:number, title:string) => {
  return patch(`/todos/${todoId}`, { title });
};
