import React, { useEffect, useReducer } from 'react';
import { Todo, Action } from '../Type/Type';
import { useLocalStorage } from './Hooks/LocalStorages';

const reducer = (state: Todo[], action: Action) => {
  let newState:Todo[] = [];
  let newTodo:Todo;
  let updateItem :Todo | undefined;

  switch (action.type) {
    case 'ADD':

      newTodo = {
        id: +new Date(),
        value: action.payload,
        completed: false,
      };

      return [...state, newTodo];
    case 'TOGGLEALL':
      newState = [...state].map((item) => {
        return { ...item, completed: action.payload };
      });

      return newState;
    case 'TOGGLEONE':
      return [...state].map((item:Todo) => {
        if (item.id === action.payload) {
          // eslint-disable-next-line no-param-reassign
          item.completed = !item.completed;
        }

        return item;
      });
    case 'DELETE':
      return state.filter(item => item.id !== action.payload);
    case 'CLEARCOMPLETE':

      return state.filter(item => item.completed === false);
    case 'UPDATE':
      updateItem = state.find(item => item.id === action.payload.id);

      if (updateItem) {
        updateItem.value = action.payload.updateValue;
      }

      return state;
    default:
      return state;
  }
};

const initialState:Todo[] = [];
const initialDispatch: (act: Action) => void = () => [];

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(initialDispatch);

type Props = {
  children:React.ReactNode
};
export const GlobalStateProvider : React.FC<Props> = ({ children }) => {
  const [storagedState, setStoragedState] = useLocalStorage<Todo[]>(
    'todos',
    [],
  );
  const [state, dispatch] = useReducer(reducer, storagedState);

  useEffect(() => {
    setStoragedState(state);
  }, [setStoragedState, state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
