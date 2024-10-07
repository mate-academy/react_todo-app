import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type TodoContextProps = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodoStatus: (id: number) => void;
  toggleMultipleTodosStatus: () => void;
  updateTodoTitle: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
  headerInputRef: React.RefObject<HTMLInputElement>;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  deleteMultipleTodos: () => void;
  filteredTodos: Todo[];
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

  const [filter, setFilter] = useState<Filter>('All');
  const headerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodoStatus = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleMultipleTodosStatus = () => {
    setTodos(prevTodos => {
      const areAllCompleted = prevTodos.every(todo => todo.completed);

      const updatedTodos = prevTodos.map(todo => {
        return { ...todo, completed: !areAllCompleted };
      });

      return updatedTodos;
    });
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const deleteMultipleTodos = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const value = {
    todos,
    addTodo,
    toggleTodoStatus,
    toggleMultipleTodosStatus,
    updateTodoTitle,
    deleteTodo,
    headerInputRef,
    filter,
    setFilter,
    filteredTodos,
    deleteMultipleTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
