function request(url, params) {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, params)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Received response ${response.status}: ${response.statusText}`,
        );
      }

      return response.json();
    })
    .then(response => response.data)
    .catch((error) => {
      throw new Error(`${error} occurred`);
    });
}

export const getUser = userId => request(`/users/${userId}`);
export const getTodos = () => request('/todos');
export const getUserTodos = userId => request(`/todos?userId=${userId}`);

export const addTodo = (userId, title) => (
  request(`/todos`, {
    method: 'POST',
    body: JSON.stringify({ userId, title, completed: false }),
  })
);

export const deleteTodo = () => {};
