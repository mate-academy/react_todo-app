import { USER } from './constant';

const USER_URL = 'https://mate-api.herokuapp.com/users';
const TODOS_URL = 'https://mate-api.herokuapp.com/todos';

export const createUser = () => fetch(
  USER_URL,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(USER),
  },
)
  .then(response => response.json())
  .then(user => user.data);

export const getUser = (userId = USER.id) => fetch(`${USER_URL}/${userId}`)
  .then(response => response.json())
  .then(user => user.data);

export const getTodos
  = (userId = USER.id) => fetch(`${TODOS_URL}/?userId=${userId}`)
    .then(response => response.json())
    .then(todos => todos.data);

export const createTodo = todo => fetch(
  TODOS_URL,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      ...todo,
      userId: USER.id,
    }),
  },
)
  .then(response => response.json())
  .then(todoServer => todoServer.data);

export const removeTodo = (todoId, key, value) => fetch(
  `${TODOS_URL}/${todoId}`,
  {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      [key]: value,
    }),
  },
);

export const deleteTodo = todoId => fetch(
  `${TODOS_URL}/${todoId}`,
  {
    method: 'DELETE',
  },
);
