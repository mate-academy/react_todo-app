import React, { createContext, useReducer } from 'react';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

export type RootState = {
  todos: Todo[];
  visibleTodos: Todo[];
  selectedFilterStatus: TodoStatus;
  tempTodo: Todo | null;
  activeTodoId: number | null;
  editTodo: number | null;
  isError: boolean;
  errorId: number;
  todosLoadingError: boolean;
  titleError: boolean;
  addError: boolean;
  notificationIsHide: boolean;
  deleteError: boolean;
  updateError: boolean;
  queryInput: string;
  editedTitle: string;
};

const initialState: RootState = {
  todos: [],
  visibleTodos: [],
  selectedFilterStatus: TodoStatus.All,
  tempTodo: null,
  activeTodoId: null,
  editTodo: null,
  isError: false,
  errorId: 0,
  todosLoadingError: false,
  titleError: false,
  addError: false,
  notificationIsHide: true,
  deleteError: false,
  updateError: false,
  queryInput: '',
  editedTitle: '',
};

type Action =
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setVisibleTodos'; payload: Todo[] }
  | { type: 'setSelectedFilterStatus'; payload: TodoStatus }
  | { type: 'setTempTodo'; payload: Todo | null }
  | { type: 'setActiveTodoId'; payload: number | null }
  | { type: 'setEditTodo'; payload: number | null }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'incrementErrorId' }
  | { type: 'setTodosLoadingError'; payload: boolean }
  | { type: 'setTitleError'; payload: boolean }
  | { type: 'setAddError'; payload: boolean }
  | { type: 'setNotificationIsHide'; payload: boolean }
  | { type: 'setDeleteError'; payload: boolean }
  | { type: 'setUpdateError'; payload: boolean }
  | { type: 'setQueryInput'; payload: string }
  | { type: 'setEditedTitle'; payload: string }
  | { type: 'removeCompletedTodos'; payload: number[] }
  | { type: 'checkAllTodos'; payload: boolean };

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'setTodos':
      return { ...state, todos: action.payload };
    case 'setVisibleTodos':
      return { ...state, visibleTodos: action.payload };
    case 'setSelectedFilterStatus':
      return { ...state, selectedFilterStatus: action.payload };
    case 'setTempTodo':
      return { ...state, tempTodo: action.payload };
    case 'setActiveTodoId':
      return { ...state, activeTodoId: action.payload };
    case 'setEditTodo':
      return { ...state, editTodo: action.payload };
    case 'setIsError':
      return { ...state, isError: action.payload };
    case 'incrementErrorId':
      return { ...state, errorId: state.errorId + 1 };
    case 'setTodosLoadingError':
      return { ...state, todosLoadingError: action.payload };
    case 'setTitleError':
      return { ...state, titleError: action.payload };
    case 'setAddError':
      return { ...state, addError: action.payload };
    case 'setNotificationIsHide':
      return { ...state, notificationIsHide: action.payload };
    case 'setDeleteError':
      return { ...state, deleteError: action.payload };
    case 'setUpdateError':
      return { ...state, updateError: action.payload };
    case 'setQueryInput':
      return { ...state, queryInput: action.payload };
    case 'setEditedTitle':
      return { ...state, editedTitle: action.payload };
    case 'removeCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !action.payload.includes(todo.id)),
        visibleTodos: state.visibleTodos.filter(
          todo => !action.payload.includes(todo.id),
        ),
      };
    case 'checkAllTodos':
      const updatedTodos = state.todos.map(todo =>
        todo.completed !== action.payload
          ? { ...todo, completed: action.payload }
          : todo,
      );

      return {
        ...state,
        todos: updatedTodos,
        visibleTodos: updatedTodos,
      };
    default:
      return state;
  }
};

export const StateContext = createContext<RootState>(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

type ProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
