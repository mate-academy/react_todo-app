import React, { useReducer, useEffect, Dispatch, createContext } from 'react';
import { Todo, Filter } from '../Todo';

export type State = {
  todos: Todo[];
  filter: Filter;
};

export type Action =
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'TOGGLE_ALL' }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'EDIT_TODO'; payload: { id: number; title: string } };

export type TodoContextType = {
  state: State;
  dispatch: Dispatch<Action>;
  addTodo: (todo: Todo) => void;
  setFilter: (filter: Filter) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  editTodo: (id: number, title: string) => void;
  focusAddInput?: () => void;
  setFocusAddInput?: (fn: () => void) => void;
};

const initialState: State = {
  todos: [],
  filter: 'all',
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return { ...state, todos: action.payload };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'TOGGLE_ALL': {
      const areAllCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllCompleted,
        })),
      };
    }

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [focusAddInput, setFocusAddInput] = React.useState<() => void>(
    () => () => {},
  );

  useEffect(() => {
    const localData = localStorage.getItem('todos');

    if (localData) {
      dispatch({ type: 'LOAD_TODOS', payload: JSON.parse(localData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (todo: Todo) => dispatch({ type: 'ADD_TODO', payload: todo });

  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
    focusAddInput();
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
    focusAddInput();
  };

  const setFilter = (filter: Filter) =>
    dispatch({ type: 'SET_FILTER', payload: filter });

  const toggleAll = () => dispatch({ type: 'TOGGLE_ALL' });

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
    focusAddInput();
  };

  const editTodo = (id: number, title: string) =>
    dispatch({ type: 'EDIT_TODO', payload: { id, title } });

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        addTodo,
        removeTodo,
        toggleTodo,
        toggleAll,
        setFilter,
        clearCompleted,
        editTodo,
        focusAddInput,
        setFocusAddInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
