import React, { useContext, useEffect, useReducer } from 'react';
import { Action, StatusFilter, Todo } from '../types/Todo';

type State = {
  todos: Todo[];
  filter: StatusFilter;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ALL_TODO':
      return {
        ...state,
        todos: action.payload,
      };
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload.title,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'CHANGE_StATUS_TODO':
      const newTodos = state.todos.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });

      return {
        ...state,
        todos: newTodos,
      };

    case 'EDIT_TITLE_TODO':
      return {
        ...state,
        todos: state.todos.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, title: action.payload.title };
          } else {
            return item;
          }
        }),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'DELETE_COMPLETED_TODOS':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'TOOGLE_COMPLETE_TODOS':
      const isAllTodosCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !isAllTodosCompleted,
        })),
      };
    default:
      return state;
  }
}

function initialTodos(): Todo[] {
  const storedTodos = localStorage.getItem('todos');
  const todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

  return todos;
}

const initialState: State = {
  todos: initialTodos(),
  filter: StatusFilter.ALL,
};

const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export function GlobalContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export const useTodos = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);
