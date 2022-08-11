const BASE_URL = 'https://mate.academy/students-api';

export const fetchPost = async (inputField: string) => {
  const todo = {
    userId: 4022,
    completed: false,
    title: inputField,
  };

  const method = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  };

  const res = await fetch(`${BASE_URL}/todos`, method);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  return result;
};
