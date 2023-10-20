import React, { useEffect, useReducer } from 'react';

import { Todo } from '../types/Todo';
import { ActionType } from '../types/Action';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Action = { type: ActionType.Add, payload: { todo: Todo } }
| { type: ActionType.Update, payload: { id: number, content: string } }
| { type: ActionType.Remove, payload: { id: number } }
| { type: ActionType.ToggleCheck, payload: { id: number } }
| { type: ActionType.toggleAll, payload: { type: boolean } };

interface State {
  todos: Todo[]
}

interface Props {
  children: React.ReactNode,
}

const reducer = ({ todos }: State, { type, payload }: Action): State => {
  switch (type) {
    case ActionType.Add:
      return { todos: [...todos, payload.todo] };
    case ActionType.Update:
      return {
        todos: todos.map((todo) => {
          if (todo.id === payload.id) {
            return { ...todo, title: payload.content };
          }

          return todo;
        }),
      };
    case ActionType.Remove:
      return {
        todos: todos.filter((todo) => todo.id !== payload.id),
      };
    case ActionType.ToggleCheck:
      return {
        todos: todos.map((todo) => {
          if (todo.id === payload.id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    case ActionType.toggleAll:
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

export const DispatchContext = React.createContext(
  (_action: Action) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
);
export const StateContext = React.createContext(
  initialState,
);

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>(
    'todos',
    initialState.todos,
  );
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
