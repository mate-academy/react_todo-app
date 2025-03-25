import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const useUser = () => {
  const [userId, setUserId] = useState<User | null>(null);
  const [localUser, setLocalUser] = useLocalStorage<User | null>(null, 'user');

  useEffect(() => {
    if (localUser) {
      setUserId(localUser);
    } else {
      client
        .get<User>(`/users?id=2472`)
        .then(response => {
          setUserId(response);
          setLocalUser(response);
        })
        .catch(() => {
          setUserId({ id: 2472 });
          setLocalUser({ id: 2472 });
        });
    }
  }, [setLocalUser]);

  return userId;
};

export const USER_ID = 2472;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const updateTodo = (id: number, data: Omit<Todo, 'id'>) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
// Add more methods here
