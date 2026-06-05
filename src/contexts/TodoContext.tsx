import React, { createContext, useContext, useEffect, useReducer } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Filter = 'All' | 'Active' | 'Completed';

type State = {
  todos: Todo[];
  filter: Filter;
  editingId: number | null;
};

type Action =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'toggle'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' }
  | { type: 'setFilter'; payload: Filter }
  | { type: 'edit'; payload: { id: number; title: string } }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'startEdit'; payload: number }
  | { type: 'finishEdit' }
  | { type: 'cancelEdit' };

const STORAGE_KEY = 'todos';

const getInitialTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: State = {
  todos: getInitialTodos(),
  filter: 'All',
  editingId: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'toggleAll': {
      const allCompleted = state.todos.every(t => t.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };
    }

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

    case 'edit':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
        editingId: null,
      };

    case 'setTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'startEdit':
      return {
        ...state,
        editingId: action.payload,
      };

    case 'finishEdit':
      return {
        ...state,
        editingId: null,
      };

    case 'cancelEdit':
      return {
        ...state,
        editingId: null,
      };

    default:
      return state;
  }
}

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const TodosContext = createContext<ContextType | null>(null);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used inside TodosProvider');
  }

  return context;
};
