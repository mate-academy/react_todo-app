import React, { useContext, useEffect } from 'react';
import { Todo } from '../types/Todo';

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: number }
  | { type: 'update'; payload: Todo }
  | { type: 'updateAll' }
  | { type: 'deleteCompleted' }
  | { type: 'edit'; payload: Todo };

type GlobalState = Todo[];

function reducer(todos: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'add': {
      return [...todos, action.payload];
    }

    case 'update': {
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
    }

    case 'updateAll': {
      const shouldComplete = todos.some(todo => !todo.completed);

      return todos.map(todo => ({ ...todo, completed: shouldComplete }));
    }

    case 'delete': {
      return todos.filter(todo => todo.id !== action.payload);
    }

    case 'deleteCompleted': {
      const completedTodosId = todos
        .filter(todo => todo.completed)
        .map(completedTodo => completedTodo.id);

      return todos.filter(todo => !completedTodosId.includes(todo.id));
    }

    case 'edit': {
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }

        return todo;
      });
    }

    default: {
      return [...todos];
    }
  }
}

const initialTodos: GlobalState = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos') as string)
  : [];

export const StateContext = React.createContext<GlobalState>(initialTodos);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = React.useReducer(reducer, initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={todos}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('NO TODOS');
  }

  return context;
};

export const useDispatch = () => {
  const context = useContext(DispatchContext);

  if (!context) {
    throw new Error('NO DISPATCH');
  }

  return context;
};
