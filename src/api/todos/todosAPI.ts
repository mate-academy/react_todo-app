const BASE_URL = 'https://mate.academy/students-api/todos';

export const getTodos = () => {
  return fetch(`${BASE_URL}`)
    .then(res => res.json());
};

export const getTodo = (userId: number) => {
  return fetch(`${BASE_URL}?userId=${userId}`)
    .then(res => res.json());
};

export const postTodo = async (title: string, userId: number, completed: boolean) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      userId,
      completed,
    }),
  });

  return response.json();
};

export const patchTodos = (todoId: number, completed: boolean, title: string) => {
  return fetch(`${BASE_URL}/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ completed, title }),
  });
};

export const deleteTodo = (todoId: number) => {
  return fetch(`${BASE_URL}/${todoId}`, {
    method: 'DELETE',
  });
};
