import { BASE_URL } from './api';

export async function getTodos(userId) {
  const response = await fetch(`${BASE_URL}/todos/`);
  const result = await response.json();
  const todos = await result.data;

  const filterTodosById = todos
    .filter(todo => todo.userId === +userId)
    .sort((curr, next) => curr.id - next.id)
    .filter(todo => todo.title);

  return filterTodosById;
}

export function addTodo(title, userId) {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      userId,
      completed: false,
    }),
  });
}

export function deleteTodo(todoId) {
  return fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
  });
}

export async function changeTodoField(todoId, value, name) {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      [name]: value,
    }),
  });

  return response;
}
