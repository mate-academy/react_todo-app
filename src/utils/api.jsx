import { BASE_URL, userId } from './constants';

const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result.data);
const requestAll = (url, options) => fetch(`${BASE_URL}${url}`, options);

const post = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});
const remove = url => request(url, { method: 'DELETE' });
const removeAll = url => requestAll(url, { method: 'DELETE' });

const patch = (url, data) => request(url, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});
const patchAll = (url, data) => requestAll(url, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

export const createUser = name => post('/users', {
  name,
  username: 'oanik',
  email: 'mate@example.com',
  phone: '1234567890',
})
  .then(response => response.json());
export const createTodo = title => post('/todos', {
  userId,
  title,
  completed: false,
});

export const getUser = id => request(`/users/${id}`);
export const getTodos = () => request('/todos');

export const deleteTodo = todoId => remove(`/todos/${todoId}`);
export const deleteAllTodos = (todos) => {
  const requests = todos.map(todo => removeAll(`/todos/${todo.id}`));

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(reply => reply.json())));
};

// eslint-disable-next-line consistent-return
export const updateTodo = (todoID, todo) => {
  const key = Object.keys(todo);

  switch (key[0]) {
    case 'title': {
      return patch(`/todos/${todoID}`, { title: todo.title });
    }

    case 'completed': {
      return patch(`/todos/${todoID}`, { completed: todo.completed });
    }

    default: {
      break;
    }
  }
};

export const updateAllTodos = (todos) => {
  const requests = todos.map(todo => patchAll(`/todos/${todo.id}`,
    { completed: todo.completed }));

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(reply => reply.json())));
};
