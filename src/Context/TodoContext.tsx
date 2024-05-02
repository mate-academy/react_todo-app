import React, {
  Dispatch,
  FC,
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { Todo } from '../types/types';
import { TodoReducer } from './TodoReducer';

export interface TodoContextType {
  todos: Todo[];
  inputRef: typeof React.createRef<HTMLInputElement> | null;
  dispatch: React.Dispatch<Action>;
  handleFocusInput: () => void;
  editFlag: boolean;
  editID: string;
  textToEdit: string;
  allCompleted: boolean;
  numberNotComplete: number;
  numberComplete: number;
}

export type Action = { type: string; payload?: string | Todo };

type TProps = {
  children: React.ReactNode;
};

const defaultDispatch: Dispatch<Action> = () => {
  throw new Error('Dispatch function not provided');
};

const initialState: TodoContextType = {
  todos: [],
  inputRef: null,
  editFlag: false,
  editID: '',
  textToEdit: '',
  allCompleted: false,
  numberNotComplete: 0,
  numberComplete: 0,
  dispatch: defaultDispatch,
  handleFocusInput: () => {},
};

export const TodoDispatch = createContext<React.Dispatch<Action>>(() => {});
export const TodoContext = createContext<TodoContextType>(initialState);

export const TodoProvider: FC<TProps> = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState, () => {
    const localValue = localStorage.getItem('todos');

    return {
      ...initialState,
      todos: localValue ? JSON.parse(localValue) : initialState.todos,
    };
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  // #region const
  const allCompleted: boolean = state.todos.every(todo => todo.completed);
  const numberNotComplete: number = state.todos.filter(
    todo => !todo.completed,
  ).length;
  const numberComplete: number = state.todos.filter(
    todo => todo.completed,
  ).length;
  // #endregion

  const value = useMemo(
    () => ({
      ...state,
      allCompleted,
      numberNotComplete,
      numberComplete,
      inputRef,
      dispatch,
      handleFocusInput,
    }),
    [state, allCompleted, numberNotComplete, numberComplete, dispatch],
  );

  return (
    <TodoDispatch.Provider value={dispatch}>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </TodoDispatch.Provider>
  );
};
