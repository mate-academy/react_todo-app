import React, { createContext, useEffect, useReducer } from 'react';
import { State } from '../types/State';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const TodoContext = createContext<ContextProps>({
  state: { todos: [], filter: FilterType.All },
  dispatch: () => {},
});

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'EDIT_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number };

function reduceTodos(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
        ),
      };

    default:
      return state;
  }
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const getStoredTodos = () => {
    const stored = localStorage.getItem('todos');

    return stored ? JSON.parse(stored) : [];
  };

  const [state, dispatch] = useReducer(reduceTodos, {
    todos: getStoredTodos(),
    filter: FilterType.All,
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
