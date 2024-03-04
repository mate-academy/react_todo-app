import React, { useEffect, useReducer } from 'react';
import { Todo } from './Types/Todo';

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

interface TodosState {
  todos: Todo[];
  filter: Status;
}

type Action =
  | { type: 'add_todo'; payload: Todo }
  | { type: 'remove_todo'; payload: number }
  | { type: 'toggle_todo'; payload: number }
  | { type: 'toggle_all_todos' }
  | { type: 'remove_completed_todos' }
  | { type: 'set_filter'; payload: Status };

interface TodosContextType extends TodosState {
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  removeCompletedTodos: () => void;
  toggleAll: () => void;
  remainingTodos: number;
  setFilter: (filter: Status) => void;
}

const initialTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

const todoReduser = (state: TodosState, action: Action): TodosState => {
  const allTodosCompleated = state.todos.every(todo => todo.completed);

  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'remove_todo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'toggle_todo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'remove_completed_todos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'toggle_all_todos':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allTodosCompleated,
        })),
      };

    case 'set_filter':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: initialTodos,
  filter: Status.All,
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  removeCompletedTodos: () => {},
  setFilter: () => {},
  remainingTodos: 0,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReduser, {
    todos: initialTodos,
    filter: Status.All,
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (title: string) => {
    if (title.trim().length !== 0) {
      const newTodo: Todo = {
        id: +new Date(),
        title,
        completed: false,
      };

      dispatch({ type: 'add_todo', payload: newTodo });
    }
  };

  const removeTodo = (id: number) => {
    dispatch({ type: 'remove_todo', payload: id });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'toggle_todo', payload: id });
  };

  const removeCompletedTodos = () => {
    dispatch({ type: 'remove_completed_todos' });
  };

  const toggleAll = () => {
    dispatch({ type: 'toggle_all_todos' });
  };

  const setFilter = (filter: Status) => {
    dispatch({ type: 'set_filter', payload: filter });
  };

  const remainingTodos = state.todos.filter(todo => !todo.completed).length;

  return (
    <TodosContext.Provider
      value={{
        ...state,
        addTodo,
        removeTodo,
        toggleTodo,
        removeCompletedTodos,
        toggleAll,
        remainingTodos,
        setFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
