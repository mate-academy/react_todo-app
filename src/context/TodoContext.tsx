import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  updateTodo: (id: number, title: string) => void;
};

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      localStorage.removeItem('todos');
    }
  }, [todos]);

  const addTodo = (title: string) => {
    setTodos(prev => [...prev, { id: +new Date(), title, completed: false }]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    inputRef.current?.focus();
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    inputRef.current?.focus();
  };

  const updateTodo = (id: number, title: string) => {
    if (!title.trim()) {
      deleteTodo(id);

      return;
    }

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: title.trim() } : todo,
      ),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        inputRef,
        addTodo,
        deleteTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
