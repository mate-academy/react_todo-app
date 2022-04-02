import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export function removeAll(ids: string[]): Promise<Todo[]> {
  return axios.patch('/todos?action=delete', { ids })
    .then(res => res.data);
}

export function updatedAll(todos: Todo[]): Promise<Todo[]> {
  return axios.patch('/todos?action=update', {
    items: todos,
  })
    .then(res => res.data);
}

export function getAll(): Promise<Todo[]> {
  return axios.get('/todos')
    .then(res => res.data);
}

export function getOne(todoId: string): Promise<Todo> {
  return axios.get(`/todos/${todoId}`)
    .then(res => res.data);
}

export function add(title: string): Promise<Todo> {
  return axios.post('/todos', { title })
    .then(res => res.data);
}

export function remove(todoId: string): Promise<string> {
  return axios.delete(`/todos/${todoId}`)
    .then(res => res.data);
}

export function update({ id, title, completed }: Todo): Promise<Todo> {
  return axios.put(`/todos/${id}`, { title, completed })
    .then(res => res.data);
}
