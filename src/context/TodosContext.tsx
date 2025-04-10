import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { Todo, FILTERS, FilterType } from '../types/todo';

interface TodosContextType {
  inputRef: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  inputValue: string;
  filterType: FilterType;
  visibleTodos: Todo[];
  notCompletedTodos: Todo[];
  handleSubmit: (e: React.FormEvent) => void;
  handleUpdateTodoTitle: (todoId: number, editedTitle: string) => void;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChecked: (todo: Todo) => void;
  handleDeleteTodo: (todo: Todo) => void;
  handleSelectedTodos: (type: FilterType) => void;
  handleClearCompleted: () => void;
  handleUncompletedAllTodos: () => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filterType, setFilterType] = useState<FilterType>(
    FILTERS.all as FilterType,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const notCompletedTodos = todos.filter(todo => !todo.completed);

  const visibleTodos = todos.filter(todo => {
    if (filterType === FILTERS.active) {
      return !todo.completed;
    }

    if (filterType === FILTERS.completed) {
      return todo.completed;
    }

    return true;
  });

  const generateId = (): number => {
    idCounter.current += 1;

    return idCounter.current;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: generateId(),
      title: inputValue.trim(),
      completed: false,
    };

    if (newTodo.title.length > 0) {
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputValue('');
    }
  };

  const handleUpdateTodoTitle = (todoId: number, editedTitle: string) => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === '') {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    } else {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoId ? { ...todo, title: trimmedTitle } : todo,
        ),
      );
    }
  };

  const handleChecked = (todoToToggle: Todo) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoToToggle.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  };

  const handleUncompletedAllTodos = () => {
    const completedChecking = todos.every(todo => todo.completed === true);

    if (completedChecking) {
      setTodos(prevTodos =>
        prevTodos.map(todo => {
          return {
            ...todo,
            completed: false,
          };
        }),
      );
    } else {
      setTodos(prevTodos =>
        prevTodos.map(todo => {
          return {
            ...todo,
            completed: true,
          };
        }),
      );
    }
  };

  const handleDeleteTodo = (todoToDelete: Todo) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== todoToDelete.id),
    );
    inputRef.current?.focus();
  };

  const handleSelectedTodos = (type: FilterType) => {
    setFilterType(type);
  };

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    inputRef.current?.focus();
  };

  return (
    <TodosContext.Provider
      value={{
        inputRef,
        todos,
        inputValue,
        filterType,
        visibleTodos,
        notCompletedTodos,
        handleSubmit,
        handleUpdateTodoTitle,
        handleChangeInput,
        handleChecked,
        handleDeleteTodo,
        handleSelectedTodos,
        handleClearCompleted,
        handleUncompletedAllTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
