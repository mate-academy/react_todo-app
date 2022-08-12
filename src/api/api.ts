const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string, option?: {}) => fetch(`${BASE_URL}${url}`, option)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Problem with loading data...');
    }

    return res.json();
  });

const post = (url: string, data: {}) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);
const patch = (url: string, data: {}) => request(url, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

export const getTodos = (id: number) => request(`/todos?userId=${id}`);

export const createTodo = (title: string, userId: number) => post('/todos', {
  title,
  userId,
  completed: false,
});

export const changeTodo = (todoId: number, value: {}) => patch(`/todos/${todoId}`, value);

export const deleteTodo = (todoId: number) => request(
  `/todos/${todoId}`,
  { method: 'DELETE' },
);
