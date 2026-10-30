import React, { useReducer, useEffect } from 'react';
import { Todo } from '../types/Todo';

const initialState: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

type Action =
  | { type: 'deleteTodo'; payload: number }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'clearCompleted' }
  | { type: 'toggleAll' }
  | { type: 'editTodo'; payload: { id: number; title: string } };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.payload];

    case 'deleteTodo':
      return state.filter(todo => todo.id !== action.payload);

    case 'toggleTodo':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case 'clearCompleted':
      return state.filter(todo => !todo.completed);

    case 'toggleAll': {
      const allCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));
    }

    case 'editTodo':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

    default:
      return state;
  }
}

const StateContext = React.createContext<Todo[]>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useTodos = () => React.useContext(StateContext);
export const useTodosDispatch = () => React.useContext(DispatchContext);
