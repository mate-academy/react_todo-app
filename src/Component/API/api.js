const BASE_URL = 'https://mate-api.herokuapp.com';

const requirest = (url) => {
  fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .then(result => result.data);
};

// eslint-disable-next-line no-console
console.log(requirest);

const post = (url, data) => {
  fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(
        `${response.status} ${response.statusText}`,
      );
    })
    .then(result => result.data);
};

export const addUser = () => {
  post('/users', {
    name: 'Sasha',
    username: 'Sasha_FE_NOV20',
    email: 'mate@example.com',
    phone: '1234567890',
  });
};

export const addTodo = ({ userId, title }) => {
  post('/todos', {
    userId,
    title,
    completed: false,
  });
};
