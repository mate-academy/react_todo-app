import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Action } from '../../types/Action';
import { todoReducer } from '../Reducer/todoReducer';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  state: Todo[];
  dispatch: React.Dispatch<Action>;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  filteredTodos: Todo[];
  filter: 'all' | 'active' | 'completed';
};

export const TodoContext = React.createContext<ContextType>({
  state: [],
  dispatch: () => {},
  setFilter: () => {},
  filteredTodos: [],
  filter: 'all',
});

export const Provider: React.FC<Props> = ({ children }) => {
  const initialValue = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos')).filter(Boolean)
    : [];

  const [state, dispatch] = useReducer(todoReducer, initialValue);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = state.filter(todo => {
    if (filter === 'active') {
      return todo.completed === false;
    }

    if (filter === 'completed') {
      return todo.completed === true;
    }

    return todo;
  });

  // useEffect(() => {
  //   if (state.length > 0) {
  //     localStorage.setItem('todos', JSON.stringify(state));
  //   } else {
  //     localStorage.removeItem('todos');
  //   }
  // }, [state]);

  const value = { state, dispatch, filter, setFilter, filteredTodos };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
