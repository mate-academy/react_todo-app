import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

type UpdatedType = { [index: string]: boolean | string };

function get<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(res => res.json());
}

function remove<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url, { method: 'DELETE' })
    .then(res => res.json());
}

export const getTodos = (): Promise<Todo[]> => {
  return get('/todos?userId=4');
};

export function postNewTodo(newTodo: Todo) {
  return fetch(`${BASE_URL}/todos`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(newTodo),
    }).then(res => res.json());
}

export function patchTodo(
  updatedValue : UpdatedType,
  todoId: number | undefined,
) {
  return fetch(`${BASE_URL}/todos/${todoId}`,
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(updatedValue),
    }).then(res => res.json());
}

export const deleteTodo = (
  todoId: number | undefined,
): Promise<Todo> => {
  return remove(`/todos/${todoId}`);
};
