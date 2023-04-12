import { useState } from 'react';
import { Todo } from '../types/Todo';

export type MakeChange = {
  add: (data: Todo) => void,
  remove: (id: number[]) => void,
  toggle: (ids: number[], data: Partial<Todo>) => void,
};

export function useLocalStorage(key: string): [Todo[], MakeChange] {
  const [value, setValue] = useState<Todo[]>(() => {
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  });

  const setData = (data: Todo[]) => {
    setValue(data);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const makeChange = {
    add(data: Todo) {
      setData([...value, data]);
    },

    remove(idTodos: number[]) {
      const filterTodos = value.filter(({ id }) => !idTodos.includes(id));

      setData(filterTodos);
    },

    toggle(ids: number[], data: Partial<Todo>) {
      const filterTodos = value.map(todo => {
        if (ids.includes(todo.id)) {
          return { ...todo, ...data };
        }

        return todo;
      });

      setData(filterTodos);
    },
  };

  return [value, makeChange];
}
