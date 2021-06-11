function request(url) {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`)
    .then(response => response.json());
}

export const getTodos = () => request('/todos');
