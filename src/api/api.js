const BASE_URL = 'https://mate-api.herokuapp.com';
const userId = '1233';

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos?userId=${userId}`)
    .then(response => response.json())
    .then(response => response.data);
};

export const addNewTodo = (todo) => {
  return fetch(`${BASE_URL}/todos/`, {
    method: 'POST',
    body: JSON.stringify(todo),
  });
};

export const removeTodo = (todoId) => {
  return fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
  })
    .then(response => response.json());
};

export const changeTodo = async(todoId, body) => {
  return fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
    .then(response => response.json());
};
