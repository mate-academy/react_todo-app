import React, {
  createContext,
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { State } from '../types/State';
import { Todo } from '../types/Todo';
import { Filters } from '../enums/TodoFilterEnum';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

export const TodoContext = createContext<Props>({
  state: { todos: [], filter: Filters.All },
  dispatch: () => {},
  inputRef: { current: null },
});

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'EDIT_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'FILTER_TODOS'; payload: Filters }
  | { type: 'DELETE_COMPLETED_TODOS'; payload: number[] }
  | { type: 'TOGGLE_ALL_TODOS'; payload: number[] };

function reduceTodos(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    default:
      return state;
  }
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const getStoredTodos = () => {
    const stored = localStorage.getItem('todos');

    return stored ? JSON.parse(stored) : [];
  };

  const [state, dispatch] = useReducer(reduceTodos, {
    todos: getStoredTodos(),
    filter: Filters.All,
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch, inputRef }}>
      {children}
    </TodoContext.Provider>
  );
};