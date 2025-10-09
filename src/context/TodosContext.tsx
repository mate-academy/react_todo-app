/* eslint-disable @typescript-eslint/indent */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Todo } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  editTodo: (id: number, title: string) => void;
  toggleAllTodos: () => void;

  filter: 'All' | 'Active' | 'Completed';
  setFilter: React.Dispatch<
    React.SetStateAction<'All' | 'Active' | 'Completed'>
  >;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  newTodoRef: React.RefObject<HTMLInputElement>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) =>
    setTodos([...todos, { id: +new Date(), title, completed: false }]);
  const toggleTodo = (id: number) =>
    setTodos(
      todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  const deleteTodo = (id: number) => setTodos(todos.filter(t => t.id !== id));
  const clearCompleted = () => setTodos(todos.filter(t => !t.completed));
  const editTodo = (id: number, title: string) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, title } : t)));
  };

  const toggleAllTodos = () => {
    const shouldCompleteAll = !todos.every(t => t.completed);

    setTodos(todos.map(t => ({ ...t, completed: shouldCompleteAll })));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        editTodo,
        toggleAllTodos,
        filter,
        setFilter,
        editingId,
        setEditingId,
        editTitle,
        setEditTitle,
        newTodoRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  return context;
};
