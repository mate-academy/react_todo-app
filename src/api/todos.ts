import axios from 'axios';
import { Todo } from '../types/Todo';

axios.defaults.baseURL = 'http://localhost:5000';

export function getAll(): Promise<Todo[]> {
  return axios.get('/todos').then(res => res.data);
}

export async function getOne(todoId: string): Promise<Todo[]> {
  const response = await axios.get(`/todos/${todoId}`);

  return response.data;
}
