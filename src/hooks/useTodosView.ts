import { useContext, useMemo } from 'react';

import {
  TodoFilterContext,
  TodoFilterContextDispatch,
} from '../context/TodoContext';
import { useTodos } from './useTodos';

export const useTodosView = () => {
  const { todos, completedTodos, uncompletedTodos } = useTodos();
  const filter = useContext(TodoFilterContext);
  const setFilter = useContext(TodoFilterContextDispatch);

  if (!setFilter || !filter) {
    throw new Error('useTodosView must be used within TodoProvider');
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'all') {
      return todos;
    }

    if (filter === 'completed') {
      return completedTodos;
    }

    if (filter === 'active') {
      return uncompletedTodos;
    }

    return todos;
  }, [todos, filter, completedTodos, uncompletedTodos]);

  return {
    visibleTodos,
    setFilter,
    filter,
  };
};
