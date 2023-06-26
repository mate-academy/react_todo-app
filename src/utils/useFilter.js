import { useMemo } from 'react';
import { Sort } from '../types/Sort';

export const useFilter = (todos, location) => {
  const modifiedTodos = useMemo(() => {
    return (todos
      .filter(todo => {
        switch (location.pathname.slice(1)) {
          case Sort.Active:
            return !todo.completed;
          case Sort.Completed:
            return todo.completed;
          case Sort.All:
          default:
            return todo;
        }
      })
    );
  }, [todos, location]);

  return modifiedTodos;
};
