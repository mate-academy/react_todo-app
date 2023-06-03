import { useState } from 'react';
import { MakeChanges } from '../types/MakeChanges';
import { Todo } from '../types/Todo';

export const useLocaleStorage = (key: string): [Todo[], MakeChanges] => {
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

    toggle(items: Todo[]) {
      const filterTodos = value.map(todo => {
        const item = items.find(({ id }) => id === todo.id);

        if (item) {
          return item;
        }

        return todo;
      });

      setData(filterTodos);
    },
  };

  return [value, makeChange];
};
