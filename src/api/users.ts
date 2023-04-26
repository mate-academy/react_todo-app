const API_URL = 'https://mate.academy/students-api';

type NewUserParams = {
  name?: string,
  username?: string,
  email: string,
  phone?: string,
};

export function createUser(params: NewUserParams) {
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: params.name,
      username: params.username,
      email: params.email,
      phone: params.phone,
    }),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
}

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
  });
}

/* this is a placeholder deleting function, to use in development

  export function deleteUser(UserId: number | undefined) {
  console.log(`user ${UserId} has been deleted`);
} */

export function deleteUser(UserId: number | undefined)
  : Promise<Response | void> {
  return fetch(`${API_URL}/users/${UserId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
/* .then(() => {
      console.log(`user #${UserId} deleted from MATE SERVER`);
    }); */
}
