import { BASE_URL } from './api';

export async function getTodos(userId) {
  const response = await fetch(`${BASE_URL}/todos/`);
  const result = await response.json();
  const todos = await result.data;

  const filterTodosById = todos
    .filter(todo => todo.userId === +userId)
    .sort((curr, next) => curr.id - next.id);

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

export async function changeCompletedTodoTrue(todoId) {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: true,
    }),
  });

  return response;
}

export async function changeCompletedTodoFalse(todoId) {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: false,
    }),
  });

  return response;
}

export async function filterActiveTodos() {
  const response = await fetch(`${BASE_URL}/todos/`);
  const result = await response.json();
  const todos = await result.data;
  const filterByCompleted = todos
    .filter(todo => todo.userId === 158 && !todo.completed);

  return filterByCompleted;
}
