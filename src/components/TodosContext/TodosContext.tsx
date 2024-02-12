import React, { createContext, useEffect, useReducer } from 'react';
import { Todo } from '../../types/Todo';

const LOCAL_STORAGE_KEY = 'todos';

interface Props {
  children: React.ReactNode;
}

type State = Todo[];
type Action = { type: 'add', payload: Todo }
| { type: 'delete', payload: number }
| { type: 'complete', payload: number }
| { type: 'completeAll' }
| { type: 'clear' }
| { type: 'edit', payload: { id: number, value: string } };

const getCurrentTodos = (): State => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (data) {
    try {
      JSON.parse(data);
    } catch (event) {
      return [];
    }
  }

  return [];
};

const relevantTodos = getCurrentTodos();

export const StateContext = createContext(relevantTodos);
export const DispatchContext = createContext((action: Action) => {
  // eslint-disable-next-line no-console
  console.debug(action);
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];

    case 'delete':
      return state.filter(todo => todo.id !== action.payload);

    case 'complete':
      return state.map(todo => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

    case 'completeAll': {
      const allAreCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({ ...todo, completed: !allAreCompleted }));
    }

    case 'clear':
      return state.filter(todo => !todo.completed);

    case 'edit':
      return state.map(todo => {
        return todo.id === action.payload.id
          ? { ...todo, title: action.payload.value }
          : todo;
      });

    default:
      return state;
  }
};

export const TodosContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, relevantTodos);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
