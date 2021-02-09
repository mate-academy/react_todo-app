import { BASE_URL } from './api';

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

export async function getTodos(userId) {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();

  return (result.data.filter(todo => todo.userId === userId));
}

export const removeTodo = (todoId) => {
  fetch(`${BASE_URL}/users/${todoId}`, {
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

export const addTodo = ({ userId, id, title, completed }) => {
  post('/todos', {
    userId: 461,
    id,
    title,
    completed,
  });
};
