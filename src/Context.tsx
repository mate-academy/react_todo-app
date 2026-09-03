import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  clearCompleted: () => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  toggleAll: () => void;
  addTodo: (title: string) => void;
  updateTodoTitle: (id: string, title: string) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const getInitialTodos = (): Todo[] => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }

    return [];
  };

  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const todo = {
      id: `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
  };

  const updateTodoTitle = (id: string, title: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title: title.trim() } : todo,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        clearCompleted,
        toggleTodo,
        deleteTodo,
        toggleAll,
        addTodo,
        updateTodoTitle,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
