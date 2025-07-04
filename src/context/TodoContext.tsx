import { createContext } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { useEffect, useRef, useState } from 'react';

type TodoContextTypes = {
  todos: Todo[];
  filteredTodos: Todo[];
  error: string;
  filterSelect: Filter;
  isDisabledInput: boolean;
  searchTerm: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filter: (type: Filter) => void;
  postTodos: (title: string) => void;
  removeTodos: (todoId: number) => void;
  changeTodo: (todoId: number, title: string, completed: boolean) => void;
  changeComplite: () => void;
  clearCompleted: () => void;
  clearError: () => void;
};

export const TodoContext = createContext<TodoContextTypes>({
  todos: [],
  filteredTodos: [],
  error: '',
  filterSelect: Filter.All,
  isDisabledInput: false,
  searchTerm: '',
  inputRef: { current: null },
  setSearchTerm: () => {},
  filter: () => {},
  postTodos: async () => {},
  removeTodos: async () => {},
  changeTodo: async () => {},
  changeComplite: () => {},
  clearCompleted: () => {},
  clearError: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = localStorage.getItem('todos');

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as Todo[];
    } catch {
      return [];
    }
  });
  const [error, setError] = useState('');
  const [filterSelect, setFilterSelected] = useState<Filter>(Filter.All);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filterSelect === 'Active') {
      return !todo.completed;
    }

    if (filterSelect === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  function postTodos(title: string) {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      setError('Title should not be empty');
      inputRef.current?.focus();

      return;
    }

    setIsDisabledInput(true);

    const tempId = Date.now();

    const tempTodo: Todo = {
      id: tempId,
      userId: 3177,
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prev => [...prev, tempTodo]);

    try {
      const newTodo = {
        id: tempId,
        title: trimmedTitle,
        completed: false,
        userId: 3177,
      };

      setTodos(prev => prev.map(todo => (todo.id === tempId ? newTodo : todo)));
      setSearchTerm('');
    } catch {
      setError('Unable to add a todo');
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
      throw new Error('Cant create new todos');
    } finally {
      setIsDisabledInput(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }

  function removeTodos(todoId: number) {
    try {
      setTodos(prev => prev.filter(todo => todo.id !== todoId));
      inputRef.current?.focus();
    } catch {
      setError('Unable to delete a todo');
      throw new Error('Cant delete todos');
    }
  }

  function changeTodo(todoId: number, title: string, completed: boolean) {
    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, title, completed } : todo,
        ),
      );
    } catch {
      setError('Unable to update a todo');
      throw new Error('Cant change todos');
    }
  }

  function changeComplite() {
    try {
      const isAllCompleted = todos.every(todo => todo.completed);

      setTodos(prev =>
        prev.map(todo => ({
          ...todo,
          completed: !isAllCompleted,
        })),
      );
    } catch {
      setError('Unable to update todos');
      throw new Error('Cant change all todos');
    }
  }

  function filter(type: Filter) {
    setFilterSelected(type);
  }

  function clearCompleted() {
    try {
      setTodos(prev => prev.filter(todo => !todo.completed));
      inputRef.current?.focus();
    } catch {
      setError('Unexpected error');
    }
  }

  const clearError = () => {
    setError('');
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filterSelect,
        isDisabledInput,
        error,
        searchTerm,
        inputRef,
        setSearchTerm,
        filter,
        postTodos,
        removeTodos,
        changeTodo,
        changeComplite,
        clearCompleted,
        clearError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
