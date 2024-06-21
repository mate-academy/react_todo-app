import React, { useReducer, useEffect, useMemo, useState } from 'react';
import { Todo } from './types/type';

export const LOCAL_STOR_KEY = 'todos';
export const storedTodos = localStorage.getItem(LOCAL_STOR_KEY);

if (!storedTodos) {
  localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify([]));
}

export const storedTodosArray: Todo[] = storedTodos
  ? JSON.parse(storedTodos)
  : [];

interface TodosContextProps {
  todos: Todo[];
  dispatch: React.Dispatch<any>;
}

interface SelectedProps {
  selected: string;
  setSelected: React.Dispatch<any>;
}

const initialTodos: Todo[] = storedTodosArray;

export const TodosContext = React.createContext<TodosContextProps>({
  todos: initialTodos,
  dispatch: () => {},
});

export const SelectedContext = React.createContext<SelectedProps>({
  selected: 'All',
  setSelected: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const todoReducer = (
  state: Todo[],
  action: { type: string; payload?: any },
) => {
  const todoFromStor = localStorage.getItem(LOCAL_STOR_KEY);
  const arrayTodosFromStor: Todo[] = todoFromStor
    ? JSON.parse(todoFromStor)
    : null;

  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'TOGGLE_ALL_BUTTON':
      return action.payload;
    case 'ALL':
      return arrayTodosFromStor;
    case 'COMPLETED':
      return arrayTodosFromStor.filter(todo => todo.completed);
    case 'ACTIVE':
      return arrayTodosFromStor.filter(todo => !todo.completed);
    case 'CLEAR_COMPLETED':
      const updStore = arrayTodosFromStor.filter(todo => !todo.completed);

      localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(updStore));

      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [selected, setSelected] = useState('All');

  useEffect(() => {
    const handleStorageChange = () => {
      const todosOfLocStore = localStorage.getItem(LOCAL_STOR_KEY);

      if (todosOfLocStore) {
        localStorage.removeItem(LOCAL_STOR_KEY);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = useMemo(
    () => ({
      todos,
      dispatch,
    }),
    [todos],
  );

  const valueForSelect = useMemo(
    () => ({
      selected,
      setSelected,
    }),
    [selected],
  );

  return (
    <TodosContext.Provider value={value}>
      <SelectedContext.Provider value={valueForSelect}>
        {children}
      </SelectedContext.Provider>
    </TodosContext.Provider>
  );
};
