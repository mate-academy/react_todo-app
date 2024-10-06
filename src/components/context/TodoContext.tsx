import { createContext, useContext, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoContextProps = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodoStatus: (id: number) => void;
  updateTodoTitle: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
  headerInputRef: React.RefObject<HTMLInputElement>;
};

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};

type TodoProviderProps = React.PropsWithChildren<{}>;

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const headerInputRef = useRef<HTMLInputElement>(null);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const toggleTodoStatus = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== id);

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const value = {
    todos,
    addTodo,
    toggleTodoStatus,
    updateTodoTitle,
    deleteTodo,
    headerInputRef,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
