import React, { useEffect, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';

type Action
  = { type: 'add', payload: Todo }
  | { type: 'update', payload: { id: number, content: string } }
  | { type: 'remove', payload: { id: number } }
  | { type: 'toggleCheck', payload: { id: number } }
  | { type: 'toggleAll', payload: { type: boolean } };

interface State {
  todos: Todo[]
}

interface Props {
  children: React.ReactNode,
}

const reducer = ({ todos }: State, { type, payload }: Action): State => {
  switch (type) {
    case 'add':
      return { todos: [...todos, payload] };
    case 'update':
      return {
        todos: todos.map((todo) => {
          if (todo.id === payload.id) {
            return { ...todo, title: payload.content };
          }

          return todo;
        }),
      };
    case 'remove':
      return {
        todos: todos.filter((todo) => todo.id !== payload.id),
      };
    case 'toggleCheck':
      return {
        todos: todos.map((todo) => {
          if (todo.id === payload.id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    case 'toggleAll':
      return {
        todos: todos.map((todo) => {
          return {
            ...todo,
            completed: payload.type,
          };
        }),
      };
    default:
      return { todos };
  }
};

const initialState: State = {
  todos: [],
};

export const DispatchContext
  = React.createContext((_action: Action) => {}); // eslint-disable-line
export const StateContext
  = React.createContext(initialState);

export const TodosProvider: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line max-len
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', initialState.todos);
  const [state, dispatch] = useReducer(reducer, { todos: storedTodos });

  useEffect(() => {
    setStoredTodos(state.todos);
  }, [setStoredTodos, state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
