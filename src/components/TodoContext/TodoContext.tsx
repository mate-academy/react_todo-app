import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Action } from '../../types/Action';

import { todoReducer } from '../Reducer/todoReducer';
import { Filter } from '../../types/Filter';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  state: Todo[];
  dispatch: React.Dispatch<Action>;
  setFilter: (filter: Filter) => void;
  filteredTodos: Todo[];
  filter: Filter;
};

export const TodoContext = React.createContext<ContextType>({
  state: [],
  dispatch: () => {},
  setFilter: () => {},
  filteredTodos: [],
  filter: Filter.all,
});

export const Provider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    if (!localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }, []);

  const initialValue = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos')).filter(Boolean)
    : [];

  const [state, dispatch] = useReducer(todoReducer, initialValue);

  const [filter, setFilter] = useState<Filter>(Filter.all);

  const filteredTodos = state.filter(todo => {
    if (filter === 'active') {
      return todo.completed === false;
    }

    if (filter === 'completed') {
      return todo.completed === true;
    }

    return todo;
  });

  const value = { state, dispatch, filter, setFilter, filteredTodos };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
