import { BASE_URL } from './api';

export async function getTodos(userId) {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();

  return (result.data.filter(todo => todo.userId === userId));
}

export const removeTodo = (todoId) => {
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    })
    .then(result => result.data);
};

const post = (url, data) => {
  fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    })
    .then(result => result.data);
};

export const addTodo = ({ userId, title, completed }) => {
  post('/todos', {
    userId,
    title,
    completed,
  });
};

export const patch = (todoId, data) => {
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    })
    .then(result => result.data);
};

export const completeTodo = ({ completed }) => {
  post('/todos', {
    completed,
  });
};
