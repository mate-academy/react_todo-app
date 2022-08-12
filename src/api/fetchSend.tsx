const BASE_URL = 'https://mate.academy/students-api';

export const fetchSend = async (
  method: string,
  inputField: string,
  completed = false,
  todoId?: number,
) => {
  const todo = {
    userId: 4022,
    completed,
    title: inputField,
  };

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  };

  const URL = todoId ? `${BASE_URL}/todos/${todoId}` : `${BASE_URL}/todos`;

  const res = await fetch(URL, options);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  return result;
};

export const fetchDelete = async (todoId: number) => {
  const URL = `${BASE_URL}/todos/${todoId}`;

  const res = await fetch(URL, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res;
};
