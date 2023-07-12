import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoNotification } from './components/TodoNotification';
import { TodoStatus } from './types/TodoStatus';
import { Todo } from './types/Todo';
import { TodoListContext } from './context/TodoListContext';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const filterBy = useLocation().pathname.slice(1);

  const showErrorMessage = (message: string) => {
    setHasError(true);
    setErrorMessage(message);
  };

  const handleCloseButton = useCallback(() => {
    setHasError(!hasError);
  }, [hasError]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filterBy === TodoStatus.Active) {
        return !todo.completed;
      }

      if (filterBy === TodoStatus.Completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filterBy]);

  const activeTodosCount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const areAllTodosCompleted = useMemo(() => (
    todos.every(todo => todo.completed)
  ), [todos]);

  const toggleAllTodos = useCallback(() => {
    const todosToToggle = areAllTodosCompleted
      ? todos.filter(todo => todo.completed)
      : todos.filter(todo => !todo.completed);

    const updatedTodos = todosToToggle.map(todo => (
      { ...todo, completed: !todo.completed }
    ));

    setTodos(todos.map(todo => {
      const updatedTodo = updatedTodos
        .find(task => task.id === todo.id);

      return updatedTodo || todo;
    }));
  }, [todos]);

  const handleEnterKeyPress = useCallback((title: string) => {
    const newTodo = {
      id: parseInt(uuidv4(), 16),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }, [todos]);

  const handleToggleButtonClick = useCallback((
    todoId: number,
    completed: boolean,
  ) => {
    setTodos(currTodos => currTodos.map(todo => {
      return todo.id === todoId
        ? { ...todo, completed }
        : todo;
    }));
  }, [todos]);

  const handleTodoRename = useCallback(async (
    todoId: number,
    title: string,
  ) => {
    setTodos(currTodos => currTodos.map(todo => {
      return todo.id === todoId
        ? { ...todo, title }
        : todo;
    }));
  }, [todos]);

  const handleRemoveButtonClick = useCallback((todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }, [todos]);

  const clearCompletedTodos = useCallback(() => {
    setTodos(todos.filter(todo => !todo.completed));
  }, [todos]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasError(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showErrorMessage]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          isToggleAllButtonVisible={!!todos.length}
          showErrorMessage={showErrorMessage}
          onEnterKeyPress={handleEnterKeyPress}
          onToggleAllButtonClick={toggleAllTodos}
          areAllTodosCompleted={areAllTodosCompleted}
        />

        <TodoListContext.Provider value={{
          visibleTodos,
          handleTodoRename,
          handleToggleButtonClick,
          handleRemoveButtonClick,
        }}
        >
          <TodoList />
        </TodoListContext.Provider>

        {todos.length > 0 && (
          <TodoFooter
            itemsLeft={activeTodosCount}
            onClearCompleted={clearCompletedTodos}
            completedCount={todos.length - activeTodosCount}
          />
        )}
      </div>

      <TodoNotification
        hasError={hasError}
        errorMessage={errorMessage}
        onCloseButton={handleCloseButton}
      />
    </div>
  );
};
