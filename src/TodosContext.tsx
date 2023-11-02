import React, { Dispatch, useEffect, useReducer } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

type Action = { type: 'add', data: Todo }
| { type: 'complete', id: number }
| { type: 'edit', id: number, title: string }
| { type: 'delete', id: number }
| { type: 'deleteAllCompleted' }
| { type: 'completeAll' };

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const initialTodos: Todo[] = [];

export function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add': {
      if (!action.data.title.replace(/\s/g, '').length) {
        return todos;
      }

      return [
        ...todos,
        {
          id: action.data.id,
          title: action.data.title,
          completed: action.data.completed,
        },
      ];
    }

    case 'edit': {
      const newTodos = todos.map(todo => (
        todo.id === action.id
          ? { ...todo, title: action.title }
          : { ...todo }
      ));

      return newTodos;
    }

    case 'complete': {
      const newTodos = todos.map(todo => (
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : { ...todo }
      ));

      return newTodos;
    }

    case 'completeAll': {
      return todos.map(todo => ({ ...todo, completed: !todo.completed }));
    }

    case 'delete': {
      return todos.filter(todo => todo.id !== action.id);
    }

    case 'deleteAllCompleted': {
      return todos.filter(todo => todo.completed === false);
    }

    default:
      return todos;
  }
}

export const DispatchContext = React.createContext(
  (() => { }) as Dispatch<Action>,
);

export const TodosContext = React.createContext<Todo[]>(initialTodos);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [storagedTodos, setStoragedTodos] = useLocalStorage<Todo[]>(
    'todos',
    [],
  );
  const [todos, dispatch] = useReducer(reducer, storagedTodos);

  useEffect(() => {
    setStoragedTodos(todos);
  }, [setStoragedTodos, todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
