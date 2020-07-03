import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-96cb8.firebaseio.com/',
});

export const todoApi = {
  async request() {
    const response = await instance.get('/todos.json');

    if (!response.data) {
      return [];
    }

    const todos = Object.entries(response.data)
      .map(todo => ({
        ...todo[1],
        id: todo[0],
      }));

    return todos;
  },
  send(todo) {
    return instance
      .post('/todos.json', todo)
      .then(response => response.data.name);
  },
  removeItem(id) {
    return instance.delete(`todos/${id}.json`);
  },
  editItem(id, name, value) {
    return instance.put(`todos/${id}/${name}.json`, JSON.stringify(value));
  },
};
