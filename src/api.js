const BASE_URL = 'https://mate.academy/students-api';
const USER_ID = '3525';

const request = (endUrl, method) => fetch(`${BASE_URL}${endUrl}`, method)
  .then(res => res.json());

export const getTodos = () => request(`/todos?userId=${USER_ID}`);

export const addTodoToServer = title => request('/todos', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    title,
    userId: USER_ID,
    completed: false,
  }),
});

export const changeTodoStatus = (todoId, satus) => request(`/todos/${todoId}`, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    completed: satus,
  }),
});

export const changeTodoTitle = (todoId, title) => request(`/todos/${todoId}`, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    title,
  }),
});

export const deleteTodoFromServer = todoId => request(`/todos/${todoId}`, { method: 'DELETE' });
