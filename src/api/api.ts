import axios from 'axios';

export const BASE_URL = 'https://mate.academy/students-api';
const userId = 88888;

export const addTodoToServer = (title: string) => axios.post(`${BASE_URL}/todos`, {
  title,
  userId,
  completed: false,
});

export const removeTodoToServer = (id: number) => axios.delete(`${BASE_URL}/todos/${id}`);

export const editTodo = (todoId: number, payload: any) => axios.patch(`${BASE_URL}/todos/${todoId}`, payload);

export const getUser = () => axios.get(`${BASE_URL}/users/${userId}`);

export const getTodosUser = () => axios.get(`${BASE_URL}/todos?userId=${userId}`);
