import React, { useReducer, Reducer } from 'react';
import { Action } from '../../types/Action';
import { State } from '../../types/State';
import { TodoType } from '../../types/TodoType';
import { FilterTypes } from '../../types/FilterTypes';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ActionType } from '../../types/ActionType';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Delete: {
      const todos = state.todos.filter(todo => todo.id !== action.payload);

      return { ...state, todos };
    }

    case ActionType.Add: {
      const todos = [...state.todos, action.payload as TodoType];

      return { ...state, todos };
    }

    case ActionType.SetCompleted: {
      const updatedTodos = state.todos.map(todo => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

      return { ...state, todos: updatedTodos };
    }

    case ActionType.EditTitle: {
      const { id, title } = action.payload;

      const renamedTodos = state.todos.map(todo => {
        return todo.id === id ? { ...todo, title } : todo;
      });

      return { ...state, todos: renamedTodos };
    }

    case ActionType.SetCompletedAll: {
      const newCompletedState = state.todos.every(todo => todo.completed);
      const newTodos = state.todos.map(todo => ({
        ...todo,
        completed: !newCompletedState,
      }));

      return { ...state, todos: newTodos };
    }

    case ActionType.ClearCompleted: {
      const todos = state.todos.filter(todo => !todo.completed);

      return { ...state, todos };
    }

    case ActionType.SetFilterActive:
      return { ...state, filter: FilterTypes.active };

    case ActionType.SetFilterCompleted:
      return { ...state, filter: FilterTypes.completed };

    case ActionType.SetFilterAll:
      return { ...state, filter: FilterTypes.all };

    default:
      return state;
  }
}

const initialState: State = {
  filter: FilterTypes.all,
  todos: [],
};

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React
  .createContext<(action: Action) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<State>('todos', initialState);

  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, todos);

  const dispatchAndSave = (action: Action) => {
    dispatch(action);
    setTodos((prevState: State) => reducer(prevState, action));
  };

  return (
    <DispatchContext.Provider value={dispatchAndSave}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
