const urlTodo = 'https://mate.academy/students-api/todos';
const urlUsers = 'https://mate.academy/students-api/users';
const myUserID = 3881;

export const getDataFromServer = (url, options) => fetch(url, options)
  .then(response => (response.ok
    ? response.json()
    : Promise.reject(new Error('Cannot load data from server'))));

export const getTodos = () => getDataFromServer(urlTodo);

export const getMyUser = () => getDataFromServer(`${urlUsers}/${myUserID}`);

export const postNewTodo = async(title) => {
  await getDataFromServer(urlTodo, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      completed: false,
      userId: myUserID,
    }),
  });
};

export const updateTodo = async(key, value, todoId) => {
  await getDataFromServer(`${urlTodo}/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      [key]: value,
    }),
  });
};

export const deleteTodo = async(todoId) => {
  await getDataFromServer(`${urlTodo}/${todoId}`, {
    method: 'DELETE',
  });
};
