const BASE_URL = 'https://mate.academy/students-api';

export const fetchPatch = async (
  inputField: string, completed: boolean, todoId: number,
) => {
  const todo = {
    userId: 4022,
    completed,
    title: inputField,
  };

  const method = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  };

  const res = await fetch(`${BASE_URL}/todos/${todoId}`, method);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  return result;
};
