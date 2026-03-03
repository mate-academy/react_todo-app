import React, { useContext, useEffect, useReducer } from 'react';
import { Todo } from '../types/todo';

interface State {
  todos: Todo[];
}

type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'DELETE'; payload: number }
  | { type: 'CHANGE'; payload: { id: number; data: Partial<Todo> } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'TOGGLE_ALL'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.payload,
            completed: false,
          },
        ],
      };

    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'CHANGE':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.data }
            : todo,
        ),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'TOGGLE_ALL':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

export const TodoStateContext = React.createContext<State>(null!);
export const TodoDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const useTodoState = () => {
  const context = useContext(TodoStateContext);

  if (!context) {
    throw new Error('State Error');
  }

  return context;
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);

  if (!context) {
    throw new Error('Dispatch Error');
  }

  return context;
};

export const GlobalTodoProvide: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={state}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
};
