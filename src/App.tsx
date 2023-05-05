import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocaleStorage';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorType } from './types/ErrorType';
import { Notification } from './components/Notification/Notification';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [isError, setIsError] = useState<ErrorType>(ErrorType.NONE);

  const { pathname } = useLocation();

  useEffect(() => {
    const showError = setTimeout((error: ErrorType) => setIsError(error), 3000);

    return () => {
      clearTimeout(showError);
    };
  }, [isError]);

  const handleAddTodo = (title: string) => {
    if (!title.trim()) {
      setIsError(ErrorType.ADD);

      return;
    }

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = useCallback((todoId: number, newTitle: string) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }, []);

  const handleRemoveTodo = useCallback((todoId: number) => {
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  }, [todos]);

  const handleChangeTodoStatus = (todoId: number) => {
    const updatedTodos = todos.map((todo: Todo) => (
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));

    setTodos(updatedTodos);
  };

  const handleToggleAll = () => {
    const isAllCompleted = todos.every((todo: Todo) => todo.completed);
    const allCompleted = todos.map((todo: Todo) => (
      { ...todo, completed: !isAllCompleted }
    ));

    setTodos(allCompleted);
  };

  const activeTodos = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo: Todo) => todo.completed);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (pathname) {
      case '/completed':
        return completedTodos;
      case '/active':
        return activeTodos;
      default:
        return todos;
    }
  }, [todos, pathname]);

  const handleClearCompleted = useCallback(() => {
    setTodos(activeTodos);
  }, [todos]);

  return (
    <>
      <div className="todoapp">
        <Header
          onAddTodo={handleAddTodo}
        />

        <TodoList
          todos={filteredTodos}
          onRemoveTodo={handleRemoveTodo}
          onUpdateTodo={handleUpdateTodo}
          onChangeStatusTodo={handleChangeTodoStatus}
          onToggleAll={handleToggleAll}
        />

        {!!todos.length && (
          <Footer
            amountActiveTodos={activeTodos.length}
            amountCompletedTodos={completedTodos.length}
            onClearCompleted={handleClearCompleted}
          />
        )}

      </div>

      {isError && (
        <Notification
          error={isError}
        />
      )}
    </>
  );
};
