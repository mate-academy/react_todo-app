import { createContext, useEffect, useReducer } from 'react';
import { ContextProps, ToDoContextProps } from '../types/types';
import { Action, State, ToDo } from '../types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

function toDoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo: ToDo) => todo.id !== action.payload,
        ),
      };

    case 'START_EDITING':
      return {
        ...state,
        todoList: state.todoList.map((todo: ToDo) =>
          todo.id === action.payload ? { ...todo, isEditing: true } : todo,
        ),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todoList: state.todoList.map((todo: ToDo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title, isEditing: false }
            : todo,
        ),
      };

    case 'COMPLETE_TODO':
      return {
        ...state,
        todoList: state.todoList.map((todo: ToDo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'TOGGLE_ALL':
      return {
        ...state,
        todoList: state.todoList.map((todo: ToDo) => ({
          ...todo,
          completed: !state.todoList.every(
            (singleTodo: ToDo) => singleTodo.completed,
          ),
        })),
      };

    case 'FILTER_All':
      return {
        ...state,
        filter: 'All',
      };
    case 'FILTER_ACTIVE':
      return {
        ...state,
        filter: 'Active',
      };
    case 'FILTER_COMPLETED':
      return {
        ...state,
        filter: 'Completed',
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todoList: state.todoList.filter((todo: ToDo) => !todo.completed),
      };

    default: {
      return state;
    }
  }
}

const initialState: State = {
  todoList: [],
  filter: 'All',
};

export const ToDoContext = createContext({} as ContextProps);

export const ToDoProvider: React.FC<ToDoContextProps> = ({ children }) => {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    'todos',
    initialState.todoList,
  );
  const [storedState, dispatch] = useReducer(toDoReducer, localStorageState);

  useEffect(() => {
    setLocalStorageState(storedState);
  }, [storedState, setLocalStorageState]);

  return (
    <ToDoContext.Provider value={{ state: storedState, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
};
