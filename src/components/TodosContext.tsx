import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Action = { type: 'addTodo', payload: Todo }
| { type: 'changeCompleted', payload: number }
| { type: 'changeAllCompleted', payload: boolean }
| { type: 'filter', payload: Status }
| { type: 'removeTodo', payload: number }
| { type: 'clearCompleted' }
| { type: 'editTitle', payload: Todo };

interface State {
  todos: Todo[];
  filterBy: Status;
}

const initialState: State = {
  todos: [],
  filterBy: Status.ALL,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ('addTodo'):
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case ('changeCompleted'):
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case ('changeAllCompleted'):
      return {
        ...state,
        todos: state.todos.map(todo => {
          return {
            ...todo,
            completed: !action.payload,
          };
        }),
      };

    case ('filter'):
      return {
        ...state,
        filterBy: action.payload,
      };

    case ('removeTodo'):
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case ('clearCompleted'):
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case ('editTitle'):
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }

          return todo;
        }),
      };

    default:
      return state;
  }
}

const getStoredTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  return {
    ...initialState,
    todos: storedTodos ? JSON.parse(storedTodos) : [],
  };
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<(action: Action) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, getStoredTodos);
  const { todos } = state;

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
