import React, { useEffect, useReducer } from 'react';
import { ActionType } from '../types/ActionType';
import { StatusTodos } from '../types/StatusTodos';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

const KEY = 'todos';

type Action = { type: ActionType.Create, payload: Todo }
| { type: ActionType.Update, payload: Todo }
| { type: ActionType.Delete, payload: number }
| { type: ActionType.Toggle, payload: number }
| { type: ActionType.ToggleAll }
| { type: ActionType.ClearCompletedTodos }
| { type: ActionType.SelectedTodos, payload: StatusTodos };

type State = {
  todos: Todo[],
  selectedTodos: StatusTodos,
};

function Reducer(state: State, action:Action):State {
  switch (action.type) {
    case ActionType.Create: {
      const newTodos = [...state.todos, action.payload];

      return { ...state, todos: newTodos };
    }

    case ActionType.Update: {
      const newTodos = state.todos.map(todo => (
        todo.id === action.payload.id
          ? {
            ...todo,
            title: action.payload.title,
            completed: action.payload.completed,
          }
          : todo
      ));

      return { ...state, todos: newTodos };
    }

    case ActionType.Delete: {
      const newTodos = state.todos
        .filter(todo => todo.id !== action.payload);

      return { ...state, todos: newTodos };
    }

    case ActionType.Toggle: {
      const newTodos = state.todos.map(todo => (
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      ));

      return { ...state, todos: newTodos };
    }

    case ActionType.ToggleAll: {
      const newTodos = state.todos.map(todo => (
        { ...todo, completed: !todo.completed }
      ));

      return { ...state, todos: newTodos };
    }

    case ActionType.ClearCompletedTodos: {
      const newTodos = state.todos
        .filter(todo => !todo.completed);

      return { ...state, todos: newTodos };
    }

    case ActionType.SelectedTodos: {
      return { ...state, selectedTodos: action.payload };
    }

    default:
      return state;
  }
}

const initialState:State = {
  todos: [],
  selectedTodos: StatusTodos.All,
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [localState, setLocalState] = useLocalStorage(KEY,
    initialState.todos);

  const [state, dispatch] = useReducer(Reducer, {
    ...initialState,
    todos: localState,
  });

  useEffect(() => {
    setLocalState(state.todos);
  }, [setLocalState, state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
