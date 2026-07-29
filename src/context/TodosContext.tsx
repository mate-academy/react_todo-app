import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';

export type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'DELETE'; payload: number }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'RENAME'; payload: { id: number; title: string } }
  | { type: 'TOGGLE_ALL'; payload: boolean }
  | { type: 'CLEAR' };

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      const newTodo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return [...todos, newTodo];

    case 'DELETE':
      return todos.filter(todo => todo.id !== action.payload);

    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case 'RENAME':
      return todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

    case 'TOGGLE_ALL':
      return todos.map(todo => ({
        ...todo,
        completed: action.payload,
      }));
    case 'CLEAR':
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
}

interface TodosContextType {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
}

export const TodosContext = React.createContext<TodosContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = React.useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
