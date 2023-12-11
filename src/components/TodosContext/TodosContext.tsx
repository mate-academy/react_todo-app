import React, { Dispatch, useEffect, useReducer } from 'react';
import { Filter } from '../../types/Todo';
import { State } from '../../types/State';

type Action = { type: 'addTodo', title: string }
| { type: 'removeTodo', id: number }
| { type: 'toggleCompleted', payload: boolean }
| { type: 'filter', payload: Filter }
| { type: 'removeCompletedTodods', }
| { type: 'markCompleted', id: number }
| { type: 'editTitle', id: number, newTitle: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, {
          id: +new Date(),
          title: action.title,
          completed: false,
        }],
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case 'editTitle':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              title: action.newTitle,
            };
          }

          return todo;
        }),
      };

    case 'removeCompletedTodods':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };

    case 'toggleCompleted': {
      return {
        ...state,
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: action.payload,
          }
        )),
      };
    }

    case 'markCompleted': {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    }

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filterBy: Filter.ALL,
};

const getStoredTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  return {
    ...initialState,
    todos: storedTodos ? JSON.parse(storedTodos) : [],
  };
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode
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
