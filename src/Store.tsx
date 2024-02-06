import React, { useContext, useEffect, useReducer } from 'react';
import { NewTodoItem } from './styles/types/NewTodoItem';

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

interface TodosState {
  todos: NewTodoItem[];
  filter: Status;
}

type Action = { type: 'add_todo'; payload: NewTodoItem }
| { type: 'toggle_todo'; payload: number }
| { type: 'toggle_all_todos' }
| { type: 'remove_todo'; payload: number }
| { type: 'remove_completed_todos' }
| { type: 'set_filter'; payload: Status };

interface TodosContextType extends TodosState {
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  remainingTodos: number;
  setFilter: (filter: Status) => void;
}

const initialTodos: NewTodoItem[] = JSON.parse(
  localStorage.getItem('todos') || '[]',
);

const todosReducer = (state: TodosState, action: Action): TodosState => {
  const areAllCompleted = state.todos.every(todo => todo.completed);

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
        todos: state.todos.map(todo => (
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )),
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
          completed: !areAllCompleted,
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

const TodosContext = React.createContext<TodosContextType>({
  todos: initialTodos,
  filter: Status.All,
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
  clearCompleted: () => {},
  toggleAll: () => {},
  remainingTodos: 0,
  setFilter: () => {},
});

export const useTodos = () => useContext(TodosContext);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    todosReducer,
    { todos: initialTodos, filter: Status.All },
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (title: string) => {
    if (title.trim() !== '') {
      const newTodo: NewTodoItem = {
        id: +Date.now(),
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

  const clearCompleted = () => {
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
        clearCompleted,
        toggleAll,
        remainingTodos,
        setFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
