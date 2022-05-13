// eslint-disable-next-line no-unused-vars
const BASE_URL = 'https://mate.academy/students-api';

const request = (url, option) => fetch(`${BASE_URL}${url}`, option)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Problem with loading data...');
    }

    return res.json();
  });

export const getTodos = id => request(`/todos?userId=${id}`);

const post = (url, data) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);

export const createUser = (
  name, username, email, phone,
) => post('/users', {
  name,
  username,
  email,
  phone,
});

export const createTodo = (title, userId) => post('/todos', {
  title,
  userId,
  completed: false,
});

const patch = (url, data) => request(url, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

export const changeTodo = (todoId, value) => {
  patch(`/todos/${todoId}`, value);
};

export const deleteTodo = todoId => request(
  `/todos/${todoId}`,
  { method: 'DELETE' },
);
