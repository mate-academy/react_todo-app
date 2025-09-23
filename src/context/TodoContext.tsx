import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/UseLocalStorage';
import { FilterTypes } from '../types/FilterTypes';

interface TodoContextType {
  todos: Todo[];
  addTodo: (value: Todo) => void;
  updateTodos: (value: Todo) => void;
  deleteTodo: (id: number) => void;
  disabledButton: boolean;
  setFilterType: (currentFilterType: FilterTypes) => void;
  selectedFilter: FilterTypes;
  filteredTodos: Todo[];
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  updateTodos: () => {},
  deleteTodo: () => {},
  disabledButton: false,
  setFilterType: () => {},
  selectedFilter: FilterTypes.All,
  filteredTodos: [],
});

type InitialState = {
  selectedFilter: FilterTypes;
  todos: Todo[];
};

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'SET_FILTER'; payload: FilterTypes };

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.payload)],
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: [
          ...state.todos.map(currentTodo => {
            if (currentTodo.id === action.payload.id) {
              return {
                ...currentTodo,
                completed: action.payload.completed,
                title: action.payload.title,
              };
            }

            return currentTodo;
          }),
        ],
      };
    case 'SET_FILTER':
      return { ...state, selectedFilter: action.payload };
    default:
      return state;
  }
}

export const TodoProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [state, dispatch] = useReducer(reducer, {
    todos: todos,
    selectedFilter: FilterTypes.All,
  });

  useEffect(() => {
    setTodos(state.todos);
  }, [setTodos, state.todos]);

  const filteredTodos = useMemo(() => {
    if (state.selectedFilter === 'Active') {
      return [...todos].filter(todo => !todo.completed);
    }

    if (state.selectedFilter === 'Completed') {
      return [...todos].filter(todo => todo.completed);
    }

    return todos;
  }, [state.selectedFilter, todos]);

  const value = useMemo(
    () => ({
      todos: state.todos,
      addTodo: (newTodo: Todo) => {
        dispatch({
          type: 'ADD_TODO',
          payload: newTodo,
        });
      },

      deleteTodo: (todoId: number) => {
        dispatch({
          type: 'DELETE_TODO',
          payload: todoId,
        });
      },

      updateTodos: (todoToUpdate: Todo) => {
        dispatch({
          type: 'UPDATE_TODO',
          payload: todoToUpdate,
        });
      },

      disabledButton:
        state.todos.length > 0 && state.todos.every(t => t.completed),

      setFilterType: (currentFilterType: FilterTypes) => {
        dispatch({
          type: 'SET_FILTER',
          payload: currentFilterType,
        });
      },

      selectedFilter: state.selectedFilter,

      filteredTodos: filteredTodos,
    }),
    [state.todos, state.selectedFilter, filteredTodos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
