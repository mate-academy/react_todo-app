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
  textInput: typeof React.createRef<HTMLInputElement> | null;
  dispatch: React.Dispatch<Action>;
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
  textInput: null,
  dispatch: defaultDispatch,
  editFlag: false,
  editID: '',
  textToEdit: '',
  allCompleted: false,
  numberNotComplete: 0,
  numberComplete: 0,
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

  const textInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    textInput.current?.focus();
  }, []);

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
      textInput,
      dispatch,
    }),
    [state, allCompleted, numberNotComplete, numberComplete, dispatch],
  );

  return (
    <TodoDispatch.Provider value={dispatch}>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </TodoDispatch.Provider>
  );
};
