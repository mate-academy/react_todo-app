import React, { Dispatch, useReducer } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Action =
  | { type: 'add'; payload: { todo: Todo } }
  | { type: 'delete'; payload: { id: number } }
  | { type: 'update'; payload: { id: number; newData: Omit<Todo, 'id'> } }
  | { type: 'filter'; payload: { status: 'All' | 'Active' | 'Completed' } };

type State = {
  todos: Todo[];
  filter: 'All' | 'Active' | 'Completed';
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'update':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.newData }
            : todo,
        ),
      };

    case 'filter':
      return {
        ...state,
        filter: action.payload.status,
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filter: 'All',
};

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalTodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
