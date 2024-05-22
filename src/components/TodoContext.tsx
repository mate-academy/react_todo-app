import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'TOGGLE_ALL' }
  | { type: 'SET_FILTER'; filter: TodoStatus }
  | { type: 'EDIT_TODO'; id: number; title: string };

const initialState: { todos: Todo[]; filter: TodoStatus } = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  filter: TodoStatus.All,
};

const todoReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), title: action.title.trim(), completed: false },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(todo => !todo.completed) };
    case 'TOGGLE_ALL':
      const areAllCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllCompleted,
        })),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, title: action.title.trim() }
            : todo,
        ),
      };
    default:
      return state;
  }
};

export const TodoContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const saveTodosToLocalStorage = useCallback(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  useEffect(() => {
    saveTodosToLocalStorage();
  }, [saveTodosToLocalStorage]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
