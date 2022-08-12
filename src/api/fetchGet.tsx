import { User } from '../types/User';
import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

export const fetchUser = async (): Promise<User | null> => {
  const res = await fetch(`${BASE_URL}/users/4022`);

  let result: User | null = null;

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  } else {
    result = await res.json();
  }

  return result;
};

export const fetchTodos = async (): Promise<Todo[] | null> => {
  const res = await fetch(`${BASE_URL}/todos`);

  let result: Todo[] | null = null;

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  } else {
    const response:Todo[] = await res.json();

    result = response.filter(el => el.userId === 4022);
  }

  return result;
};
