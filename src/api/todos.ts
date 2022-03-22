const API_URL = 'https://mate.academy/students-api/todos';

type Patch = {
  completed?: boolean,
  title?: string,
};

export const getTodos = async (userId: number): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}?userId=${userId}`);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export const postTodo = async (todo: TodoToPost): Promise<Todo> => {
  const response = await fetch(`${API_URL}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'POST',
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export const patchTodo = async (todoId: number, body: Patch): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${todoId}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'PATCH',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export const deleteTodo = async (todoId: number): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${todoId}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};
