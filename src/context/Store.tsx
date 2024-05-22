import React, { useReducer, createContext, useEffect } from 'react';

type Action =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'markCompleted'; payload: number }
  | { type: 'setFilter'; payload: 'all' | 'active' | 'completed' }
  | { type: 'clearCompleted' }
  | { type: 'restoreTodo'; payload: Todo[] }
  | { type: 'toggleAll' };

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), title: action.payload, completed: false },
        ],
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'markCompleted':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'restoreTodo':
      return {
        ...state,
        todos: action.payload,
      };

    case 'toggleAll':
      const allCompleted = state.todos.every(todo => todo.completed);
      const todosUpdStatus = state.todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));

      return {
        ...state,
        todos: todosUpdStatus,
      };
    default:
      return state;
  }
}

const initialState: State = { todos: [], filter: 'all' };

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(
  // eslint-disable-next-line prettier/prettier
  () => { },
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      dispatch({ type: 'restoreTodo', payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
