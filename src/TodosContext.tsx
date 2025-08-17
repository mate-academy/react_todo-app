import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { deleteTodo, createTodo, updateTodo } from './api/todos';
import { FilterType } from './types/FilterType';
import { ErrorMessages } from './types/ErrorMessages';

type TodoContextType = {
  todos: Todo[];
  deleteTodoFromList: (todoId: number) => void;
  clearCompletedTodos: () => void;
  addTodo: (title: string) => void;
  updateTodoInList: (itemToUpdate: Todo) => void;
  toggleAllTodos: () => void;
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
  errorMessage: ErrorMessages;
  setErrorMessage: (message: ErrorMessages) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  tempTodo: Todo | null;
  setTempTodo: (todo: Todo | null) => void;
  loadingTodoIds: number[];
  setLoadingTodoIds: (ids: number[]) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const defaultTodoContext: TodoContextType = {
  todos: [],
  deleteTodoFromList: () => {},
  clearCompletedTodos: () => {},
  addTodo: () => {},
  updateTodoInList: async () => {},
  toggleAllTodos: () => {},
  currentFilter: FilterType.all,
  setCurrentFilter: () => {},
  errorMessage: ErrorMessages.default,
  setErrorMessage: () => {},
  isLoading: false,
  setIsLoading: () => {},
  title: '',
  setTitle: () => {},
  tempTodo: null,
  setTempTodo: () => {},
  loadingTodoIds: [],
  setLoadingTodoIds: () => {},
  inputRef: React.createRef<HTMLInputElement>(),
};

export const TodosContext =
  React.createContext<TodoContextType>(defaultTodoContext);

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  return context;
};

type TodosProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>(() => {
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
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.default,
  );
  const [currentFilter, setCurrentFilter] = useState(FilterType.all);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteTodoFromList = async (todoId: number) => {
    setLoadingTodoIds(ids => [...ids, todoId]);
    setIsLoading(true);

    try {
      await deleteTodo(todoId);
      setTodos(todoList => todoList.filter(todo => todo.id !== todoId));
    } catch {
      setErrorMessage(ErrorMessages.deleteError);
    } finally {
      setIsLoading(false);
      setLoadingTodoIds(ids => ids.filter(id => id !== todoId));
      inputRef.current?.focus();
    }
  };

  function clearCompletedTodos() {
    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      setErrorMessage(ErrorMessages.deleteError || 'No completed todos');

      return;
    }

    setIsLoading(true);
    completedTodos.forEach(todo => deleteTodoFromList(todo.id));
  }

  async function addTodo(todoTitle: string) {
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      setErrorMessage(ErrorMessages.emptyTitleError);

      return;
    }

    setIsLoading(true);
    // тимчасовий todo
    const newTempTodo: Todo = {
      id: 0,
      title: trimmedTitle,
      completed: false,
    };

    setTempTodo(newTempTodo);

    try {
      const newTodo = await createTodo({
        title: trimmedTitle,
        completed: false,
      });

      setTodos(currentTodoList => [...currentTodoList, newTodo]);
      setTitle('');
      setErrorMessage(ErrorMessages.default);
    } catch (error) {
      setErrorMessage(ErrorMessages.addError || 'Unable to add a todo');
    } finally {
      setTempTodo(null);
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function updateTodoInList(itemToUpdate: Todo) {
    setLoadingTodoIds(prev => [...prev, itemToUpdate.id]);

    try {
      const updatedTodo = await updateTodo(itemToUpdate);

      setTodos(currentTodoList =>
        currentTodoList.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      );
    } catch (error) {
      setErrorMessage(ErrorMessages.updateError || 'Unable to update todo');
      throw error;
    } finally {
      setLoadingTodoIds(prev => prev.filter(id => id !== itemToUpdate.id));
    }
  }

  const toggleAllTodos = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const contextValue: TodoContextType = {
    todos,
    addTodo,
    deleteTodoFromList,
    clearCompletedTodos,
    updateTodoInList,
    toggleAllTodos,
    currentFilter,
    setCurrentFilter,
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
    title,
    setTitle,
    tempTodo,
    setTempTodo,
    loadingTodoIds,
    setLoadingTodoIds,
    inputRef,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
