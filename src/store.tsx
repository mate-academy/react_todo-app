import React, { useMemo, useReducer, useEffect } from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

type Action = { type: 'ADD_TODO', payload: Todo }
| { type: 'DELETE_TODO', payload: Todo }
| { type: 'TOGGLE_TODO', payload: Todo }
| { type: 'TOGGLE_ALL', payload: boolean }
| { type: 'STATUS', payload: Status }
| { type: 'CLEAR_COMPLETED' }
| { type: 'UPDATE_TODO_TITLE', payload: { id: number, title: string } };

const reducer = (state: TodosContextType, action: Action): TodosContextType => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos] };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(
          (todo: Todo) => todo.id !== action.payload.id,
        ),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'TOGGLE_ALL':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };

    case 'STATUS':
      return { ...state, status: action.payload };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'UPDATE_TODO_TITLE':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, title: action.payload.title };
          }

          return todo;
        }),
      };

    default:
      return state;
  }
};

type TodosContextType = {
  todos: Todo[];
  status: Status,
  dispatch: React.Dispatch<Action>
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  status: Status.All,
  dispatch: () => {},
});

const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

const initialState: TodosContextType = {
  todos: storedTodos,
  status: Status.All,
  dispatch: () => {},
};

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, status }, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({
    todos,
    status,
    dispatch,
  }), [todos, status]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
