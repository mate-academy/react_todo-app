import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../api/todos';

const TodoStateContext = createContext<Todo[] | undefined>(undefined);
const TodoDispatchContext = createContext<TodoDispatch | undefined>(undefined);

const STORAGE_KEY = 'todos';

type TodoDispatch = {
  addTodo: (title: string) => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
  deleteCompleted: () => void;
  toggleComplete: (id: number) => void;
  toggleAll: () => void;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    setTodos(prev => [
      ...prev,
      { id: +new Date(), userId: USER_ID, title, completed: false },
    ]);
  };

  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const areAllChecked = todos.every(todo => todo.completed);

    setTodos(prev =>
      prev.map(todo => ({ ...todo, completed: !areAllChecked })),
    );
  };

  const deleteCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const dispatch = {
    addTodo,
    updateTodo,
    deleteTodo,
    deleteCompleted,
    toggleComplete,
    toggleAll,
  };

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoStateContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);

  if (!context) {
    throw new Error('useTodoDispatch must be used within a TodoProvider');
  }

  return context;
};
