import { createContext, useEffect, useReducer } from 'react';
import { ITodo } from '../types';

type Action = { type: 'ADD_TODO', payload: ITodo }
| { type: 'TOGGLE_TODO', payload: number }
| { type: 'EDIT_TODO', payload: { id: number, title: string } }
| { type: 'DELETE_TODO', payload: number }
| { type: 'DELETE_ALL_COMPLETED_TODOS' }
| { type: 'TOGGLE_ALL_TODOS', payload: boolean };

interface State {
  todos: ITodo[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }

          return todo;
        }),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'DELETE_ALL_COMPLETED_TODOS':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'TOGGLE_ALL_TODOS':
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: action.payload,
        })),
      };

    default:
      return state;
  }
};

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

export const StateContext = createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = createContext(((_action: Action) => { }));

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>

  );
};
