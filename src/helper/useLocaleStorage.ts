import { useState, useEffect } from 'react';
import { MakeChange } from '../types/MakeChange';
import { Todo } from '../types/Todo';

export const useLocaleStorage = (key: string): [Todo[], MakeChange] => {
  const [value, setValue] = useState<Todo[]>(() => {
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const makeChange = {
    add: (data: Todo) => {
      setValue(prevValue => [...prevValue, data]);
    },

    remove: (idTodos: number[]) => {
      setValue(prevValue => prevValue.filter(
        ({ id }) => !idTodos.includes(id),
      ));
    },

    toggle: (items: Todo[]) => {
      setValue(prevValue => prevValue.map(todo => {
        const item = items.find(({ id }) => id === todo.id);

        return item || todo;
      }));
    },
  };

  return [value, makeChange];
};
