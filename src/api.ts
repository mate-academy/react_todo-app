export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options?: Option) => {
  let response: Response;

  if (options) {
    response = await fetch(`${BASE_URL}${url}`, options);
  } else {
    response = await fetch(`${BASE_URL}${url}`);
  }

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};

export const getUserTodos = async (userId: number) => {
  try {
    const userTodos = await request(`/todos/?userId=${userId}`);

    return userTodos;
  } catch {
    return [];
  }
};

export const addNewTodo = async (
  title: string,
  userId: number,
  completed: boolean,
) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      userId,
      completed,
    }),
  };

  try {
    const addResult
    = await request('/todos', options);

    return addResult;
  } catch {
    return false;
  }
};

export const changeTodo = async (
  todoId: number,
  changingFieldName: string,
  newValue: string,
) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      [changingFieldName]: newValue,
    }),
  };

  try {
    const editResult = await request(`/todos/${todoId}`, options);

    return editResult;
  } catch {
    return false;
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    const deleteResult = await request(`/todos/${todoId}`, { method: 'DELETE' });

    return deleteResult;
  } catch {
    return false;
  }
};
