import React, { useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';
import { DispatchType } from '../types/DispatchType';

const initialState: Todo[] = [];

const initialDispatch: DispatchType = () => { };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'create':
      return [
        ...state,
        {
          id: +new Date(),
          title: action.payload,
          completed: false,
        },
      ];
    case 'remove':
      return state.filter(todo => todo.id !== action.payload.id);
    case 'remove all completed':
      return state.filter(todo => !todo.completed);
    case 'toggle completed status':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
    case 'toggle all completed status':
      return state.map(todo => ({ ...todo, completed: !todo.completed }));
    case 'edit title':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }

        return todo;
      });
    default:
      return state;
  }
}

const TodosStateContext = React.createContext(initialState);
const TodosDispatchContext = React.createContext(initialDispatch);

const LOCAL_STORAGE_KEY = 'todos';

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todosState, todosDispatch] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    reducer,
    initialState,
  );

  return (
    <TodosDispatchContext.Provider value={todosDispatch}>
      <TodosStateContext.Provider value={todosState}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
};

export const useTodosState = () => useContext(TodosStateContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);
