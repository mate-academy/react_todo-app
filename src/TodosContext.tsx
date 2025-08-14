import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import {
  deleteTodo as apiDeleteTodo,
  createTodo,
  updateTodo as apiUpdateTodo,
} from './api/todos';
import { FilterType } from './types/FilterType';
import { ErrorMessages } from './types/ErrorMessages';

type TodoContextType = {
  todos: Todo[];
  deleteTodo: (todoId: number) => void;
  clearCompletedTodos: () => void;
  addTodo: (title: string) => void;
  updateTodo: (itemToUpdate: Todo) => void;
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

export const TodosContext = React.createContext<TodoContextType | undefined>(
  undefined,
);

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
  const USER_ID = 2576;

  // useEffect(() => {
  //   setIsLoading(true);
  //   setCurrentFilter(FilterType.all);
  //   setErrorMessage(ErrorMessages.default);

  //   getTodos()
  //     .then(setTodos)
  //     .catch(() => {
  //       setErrorMessage(ErrorMessages.getError);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, [isLoading]);

  const deleteTodo = (todoId: number) => {
    setLoadingTodoIds(ids => [...ids, todoId]);
    setIsLoading(true);

    apiDeleteTodo(todoId)
      .then(() => {
        setTodos(todoList => todoList.filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        setErrorMessage(ErrorMessages.deleteError);
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingTodoIds(ids => ids.filter(id => id !== todoId));
        inputRef.current?.focus();
      });
  };

  function clearCompletedTodos() {
    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      setErrorMessage(ErrorMessages.deleteError || 'No completed todos');

      return;
    }

    setIsLoading(true);
    completedTodos.forEach(todo => deleteTodo(todo.id));
  }

  function addTodo(todoTitle: string) {
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      setErrorMessage(ErrorMessages.emptyTitleError);

      return;
    }

    setIsLoading(true);
    // тимчасовий todo
    const newTempTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTempTodo(newTempTodo);

    createTodo({ title: trimmedTitle, userId: USER_ID, completed: false })
      .then(newTodo => {
        setTodos(currentTodoList => [...currentTodoList, newTodo]);
        setTitle('');
        setErrorMessage(ErrorMessages.default);
      })
      .catch(() => {
        setErrorMessage(ErrorMessages.addError || 'Unable to add a todo');
      })
      .finally(() => {
        setTempTodo(null);
        setIsLoading(false);
        inputRef.current?.focus();
      });
  }

  function updateTodo(itemToUpdate: Todo) {
    setLoadingTodoIds(prev => [...prev, itemToUpdate.id]);

    return apiUpdateTodo(itemToUpdate)
      .then(updatedTodo => {
        setTodos(currentTodoList =>
          currentTodoList.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(() => {
        setErrorMessage(ErrorMessages.updateError || 'Unable to update todo');
        throw new Error();
      })
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== itemToUpdate.id));
      });
  }

  const toggleAllTodos = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    const todosToUpdate = todos.filter(
      todo => todo.completed === areAllCompleted,
    );

    todosToUpdate.forEach(todo => {
      updateTodo({ ...todo, completed: !areAllCompleted }).catch(() => {
        setErrorMessage(ErrorMessages.updateError || 'Unable to toggle todos');
      });
    });
  };

  const contextValue: TodoContextType = {
    todos,
    addTodo,
    deleteTodo,
    clearCompletedTodos,
    updateTodo,
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
