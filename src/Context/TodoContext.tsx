import React, { useEffect, useReducer, createContext } from 'react';
import { useLocaleStorage } from '../Hooks/UseLocaleStorage';
import { ReducerType } from '../Types/ReducerType';
import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';

interface Props {
  children: React.ReactNode;
}

interface State {
  todos: Todo[];
  filter: Status;
}

const defaultState: State = {
  todos: [],
  filter: Status.ALL,
};

type Action =
  | { type: ReducerType.AddTodo; payload: Todo }
  | { type: ReducerType.ToggleAll; payload: boolean }
  | { type: ReducerType.ChangeTodo; payload: Todo }
  | { type: ReducerType.SetFilter; payload: Status }
  | { type: ReducerType.DeleteTodo; payload: number }
  | { type: ReducerType.ClearCompletedTodos };

function changeTodoReducer(todos: Todo[], payload: Todo): Todo[] {
  return todos.map((todo) => {
    if (todo.id === payload.id) {
      return payload;
    }

    return {
      ...todo,
    };
  });
}

export function toggleAllReducer(todos: Todo[], payload: boolean): Todo[] {
  return todos.map((todo) => {
    return {
      ...todo,
      completed: payload,
    };
  });
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ReducerType.AddTodo:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case ReducerType.ToggleAll:
      return {
        ...state,
        todos: toggleAllReducer(state.todos, action.payload),
      };

    case ReducerType.ChangeTodo:
      return {
        ...state,
        todos: changeTodoReducer(state.todos, action.payload),
      };

    case ReducerType.SetFilter:
      return {
        ...state,
        filter: action.payload,
      };

    case ReducerType.DeleteTodo:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case ReducerType.ClearCompletedTodos:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
}

export const StateContext = createContext(defaultState);
export const DispatchContext
  = createContext<(action: Action) => void>(() => {});

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [initialState, setInitialState]
   = useLocaleStorage('todos', defaultState.todos);

  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    todos: initialState,
  });

  useEffect(() => {
    setInitialState(state.todos);
  }, [setInitialState, state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
