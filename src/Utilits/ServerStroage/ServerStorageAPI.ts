export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getTodos = () => (request('/todos'));

export const addTodoServer = async (todo:{}) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(
      todo,
    ),
  });

  return response.json();
};

export const updateTodoServer = async (
  todoId: number,
  valuesToChange: {},
) => {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(valuesToChange),
  });

  return response.json();
};

export const deleteTodoServer = async (
  todoId: number,
) => {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, { method: 'DELETE' });

  return response.json();
};
