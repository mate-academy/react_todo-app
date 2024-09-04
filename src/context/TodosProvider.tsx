import React, { useEffect, useReducer } from 'react';

import { KEY } from '../api/todos';
import { reducer } from './reducer';
import { todosContext } from './todosContext';

import { ActionTypes } from '../types/ActionTypes';

type Props = { children: React.ReactNode };

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (!localStorage[KEY]) {
      localStorage.setItem(KEY, '[]');
    }

    dispatch({ type: ActionTypes.onGet });
  }, []);

  return (
    <todosContext.Provider value={{ todos, dispatch }}>
      {children}
    </todosContext.Provider>
  );
};
