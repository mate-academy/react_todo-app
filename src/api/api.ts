const API = 'https://mate.academy/students-api/todos';

export const getTodos = () => {
  return fetch(`${API}/?userId=8787`)
    .then(res => res.json());
};

export const addTodo = (arg: {}) => {
  return fetch(`${API}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(arg),
  });
};

export const deleteTodo = (id: number) => {
  return fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
};

export const changeTodo = (id: number, value: boolean) => {
  return fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ completed: value }),
  });
};

export const changeTodoTitle = (id: number, value: string) => {
  return fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ title: value }),
  });
};
