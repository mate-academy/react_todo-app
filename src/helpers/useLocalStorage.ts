import { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoChanges } from '../types/TodoChanges';

export const useLocalStorage = (key: string): [Todo[], TodoChanges] => {
  const [value, setValue] = useState<Todo[]>(() => {
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  });

  const setData = (data: Todo[]) => {
    setValue(data);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const todoChanges = {
    add(data: Todo) {
      setData([...value, data]);
    },

    remove(todosId: number[]) {
      const newTodos = value.filter(({ id }) => !todosId.includes(id));

      setData(newTodos);
    },

    toggle(items: Todo[]) {
      const newTodos = value.map(todo => {
        const item = items.find(({ id }) => id === todo.id);

        if (item) {
          return item;
        }

        return todo;
      });

      setData(newTodos);
    },
  };

  return [value, todoChanges];
};
