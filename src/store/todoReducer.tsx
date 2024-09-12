import { FC, ReactNode, createContext, useReducer } from 'react';
import { Action, Actions } from '../types/actions';
import { Filter, State } from '../types/state';

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Action.addTodo: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case Action.updateTodo: {
      const todoToBeUpdate = state.todos.find(
        todo => todo.id === action.payload.id,
      );

      if (!todoToBeUpdate) {
        return state;
      }

      if (typeof action.payload.changes === 'string') {
        todoToBeUpdate.title = action.payload.changes;
      } else {
        todoToBeUpdate.completed = action.payload.changes;
      }

      localStorage.setItem('todos', JSON.stringify(state.todos));

      return { ...state };
    }

    case Action.deleteTodo: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    }

    case Action.changeFiilter: {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case Action.cleareCompleted: {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    }

    default: {
      return state;
    }
  }
};

const inititalState: State = {
  filter: Filter.all,
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

export const StateContext = createContext(inititalState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = createContext((action: Actions) => {});

type Props = {
  children: ReactNode;
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
