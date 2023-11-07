/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable-next-line no-case-declarations */

import React, {
  createContext, useEffect, useReducer, useState,
} from 'react';
import { TodoItemType } from '../../types/TodoItemType';
import { Action, AllActions } from '../../types/Action';
import { Status } from '../../types/Status';

const reducer = (state: TodoItemType[], action: Action): TodoItemType[] => {
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

const initial: TodoItemType[] = [];
const visible: TodoItemType[] = [];

export const TodosContext = createContext(initial);
export const DispatchContext = createContext((_action: Action) => { });
export const VisibleTodosContext = createContext(visible);
export const DispatchVisibleItemsContext
= createContext((_arg: Status) => {});

type Props = {
  children: React.ReactNode,
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const todosFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');
  const [todos, dispatch] = useReducer(reducer, todosFromStorage);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [visibleStatus, setVisibleStatus] = useState(Status.All);

  useEffect(() => {
    let visibleItems: TodoItemType[];

    if (todos.length === 0) {
      setVisibleStatus(Status.All);
      setVisibleTodos([]);

      return;
    }

    switch (visibleStatus) {
      case Status.All:
        visibleItems = [...todos];
        setVisibleTodos(visibleItems);
        break;

      case Status.Active:
        visibleItems = todos.filter(item => !item.completed);
        setVisibleTodos(visibleItems);
        break;

      case Status.Completed:
        visibleItems = todos.filter(item => item.completed);
        setVisibleTodos(visibleItems);
        break;

      default:
        break;
    }
  }, [todos, visibleStatus]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        <DispatchVisibleItemsContext.Provider value={setVisibleStatus}>
          <VisibleTodosContext.Provider value={visibleTodos}>
            {children}
          </VisibleTodosContext.Provider>
        </DispatchVisibleItemsContext.Provider>
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
