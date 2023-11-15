/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {
  createContext, useReducer, useState,
} from 'react';
import { TodoItem } from '../../types/TodoItem';
import { Action, AllActions } from '../../types/Action';
import { Status } from '../../types/Status';

const reducer = (state: TodoItem[], action: Action): TodoItem[] => {
  switch (action.type) {
    case AllActions.Add:
      localStorage.setItem('todos', JSON.stringify([...state, action.payload]));

      return [...state, action.payload];

    case AllActions.Remove:
      localStorage.setItem('todos',
        JSON.stringify(state.filter(todo => todo.id !== action.payload)));

      return state.filter(todo => todo.id !== action.payload);

    case AllActions.Update:
      const allTodos = [...state];
      const index = allTodos.findIndex(item => item.id === action.payload);

      allTodos[index] = action.value;
      localStorage.setItem('todos', JSON.stringify(allTodos));

      return allTodos;

    case AllActions.RemoveCompleted:
      localStorage.setItem('todos',
        JSON.stringify(state.filter(item => item.completed !== true)));

      return state.filter(item => item.completed !== true);

    case AllActions.CompleteAll:
      let status = true;

      if (state.every(item => item.completed === true)) {
        status = false;
      }

      localStorage.setItem('todos', JSON.stringify(state.map(item => {
        return { ...item, completed: status };
      })));

      return state.map(item => {
        return { ...item, completed: status };
      });

    default:
      localStorage.setItem('todos', JSON.stringify(state));

      return state;
  }
};

type Controller = {
  dispatch: React.Dispatch<Action>,
  todos: TodoItem[],
  visibleStatus: Status,
  setVisibleStatus: React.Dispatch<React.SetStateAction<Status>>
};

const controllerObject: Controller = {
  dispatch: () => {},
  todos: [],
  visibleStatus: Status.All,
  setVisibleStatus: () => {},
};

export const GlobalContextController = createContext(controllerObject);

type Props = {
  children: React.ReactNode,
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const todosFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');
  const [todos, dispatch] = useReducer(reducer, todosFromStorage);
  const [visibleStatus, setVisibleStatus] = useState(Status.All);

  return (
    <GlobalContextController.Provider value={{
      dispatch,
      todos,
      visibleStatus,
      setVisibleStatus,
    }}
    >
      {children}
    </GlobalContextController.Provider>
  );
};
