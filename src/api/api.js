// const BASE_URL = 'https://mate-api.herokuapp.com';
const BASE_URL = 'http://localhost:8080';
const userId = '1233';

// export const getTodos = () => (
//   fetch(`${BASE_URL}/todos?userId=${userId}`)
//     .then(response => response.json())
//     .then(response => response.data)
// );
export const getTodos = () => (
  fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    // .then(response => response.data)
);

export const addNewTodo = todo => (
  fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then(response => response.json())
);

export const multipleChange = (body, actions) => (
  fetch(`${BASE_URL}/todos?actions=${actions}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    // .then(response => response.json())
);

export const removeTodo = todoId => (
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
);

export const changeTodo = async(todoId, body) => (
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
);

export const registration = async body => (
  fetch(`${BASE_URL}/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
);

export const login = async body => (
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
);
