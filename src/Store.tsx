import React, { useReducer } from 'react';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { ActionType } from './types/ActionType';

type Action =
  | { type: ActionType.Add; payload: string }
  | { type: ActionType.Update; payload: { id: number; title: string } }
  | { type: ActionType.Remove; payload: number }
  | { type: ActionType.Toggle; payload: number }
  | { type: ActionType.ToggleAll; payload: boolean }
  | { type: ActionType.Clear }
  | { type: ActionType.SetFilter; payload: Status }
  | { type: ActionType.SetTodos; payload: Todo[] };

type State = {
  todos: Todo[];
  filter: Status;
};

const initialState: State = {
  todos: [],
  filter: Status.All,
};

export const TodosContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Add:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload,
            completed: false,
          },
        ],
      };
    case ActionType.Update:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    case ActionType.Remove:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case ActionType.Toggle:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case ActionType.ToggleAll:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };
    case ActionType.Clear:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case ActionType.SetFilter:
      return {
        ...state,
        filter: action.payload,
      };
    case ActionType.SetTodos:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
