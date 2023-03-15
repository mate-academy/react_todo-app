// import { CloudUser } from '../types/CloudUser';
// import { CloudTodo } from '../types/CloudTodo';

const API_URL = 'https://mate.academy/students-api';

export function postUser(email: string) {
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: 'a',
      username: 'a',
      email,
      phone: 'a',
    }),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
}

/* const timeoutCheck = (s:number) => {
  return new Promise(resolve => setTimeout(resolve, s));
}; */

export function getAllUsers(): Promise<Response> {
  return fetch(`${API_URL}/users`, {
    method: 'GET',
  });
}

export function getUserTodos(UserId: number): Promise<Response> {
  return fetch(`${API_URL}/todos/${UserId}`, {
    method: 'GET',
  });
}

export function LoadUserTodos(userId: number): Promise<Response> {
  return fetch(`${API_URL}/todos?userId=${userId}`, {
    method: 'GET',
  });
}

export function deleteTodo(TodoId: number): Promise<Response> {
  return fetch(`${API_URL}/todos/${TodoId}`, {
    method: 'DELETE',
  });
}

export function createTodo(title: string, userId: number) {
  return fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      userId,
      completed: false,
    }),
  })
    .then(() => {
      console.log(JSON.stringify({
        title,
        userId,
        completed: false,
      }));
    });
}

type PatchParams = {
  id?: number,
  userId?: number,
  completed?: boolean,
  title?: string,
  createdAt?: string,
  updatedAt?: string,
};

export function updateTodo(
  TodoId: number,
  params: PatchParams,
): Promise<Response | void> {
  return fetch(`${API_URL}/todos/${TodoId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(params),
  })
    .then(() => {
      console.log(JSON.stringify(params));
    });
}
