/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer } from 'react';

import { Todo } from '../../types/Todo';
import { TodoStatistic } from '../../types/TodoStatistic';
import { getTodosStatistic } from '../../utils/getTodosStatistic';
import { getLocalStorageData } from '../../utils/getLocalStorageData';

const TODOS_KEY = 'todos';

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'update'; payload: Todo }
  | { type: 'delete'; payload: number };

function reducer(todos: Todo[], action: Action): Todo[] {
  let newTodos: Todo[] = [];

  switch (action.type) {
    case 'add':
      newTodos = [...todos, action.payload];
      break;

    case 'update':
      newTodos = todos.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );
      break;

    case 'delete':
      newTodos = todos.filter(todo => todo.id !== action.payload);
      break;

    default:
      return todos;
  }

  localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));

  return newTodos;
}

const initialState: Todo[] = getLocalStorageData(TODOS_KEY, []);
const initialStatistic: TodoStatistic = {
  all: 0,
  active: 0,
  completed: 0,
};

export const TodosContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_v: Action) => {});
export const StatisticContext = React.createContext(initialStatistic);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        <StatisticContext.Provider value={getTodosStatistic(todos)}>
          {children}
        </StatisticContext.Provider>
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
