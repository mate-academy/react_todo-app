import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header/Header';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [errorText, setErrorText] = useState('');

  const { pathname: path } = useLocation();
  const closeError = () => setTimeout(() => setErrorText(''), 3000);
  const completedTodos = useMemo(
    () => todos.filter((todo: Todo) => todo.completed), [todos],
  );
  const activeTodos = useMemo(
    () => todos.filter((todo: Todo) => !todo.completed), [todos],
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    if (!title.length) {
      setErrorText("Title can't be empty");
      closeError();

      return;
    }

    const newTodo = {
      id: +(new Date()),
      title,
      completed: false,
    };

    setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
  }, []);

  const removeTodo = useCallback((id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  }, [todos]);

  const updateTodo = useCallback((id: number, data: string | boolean) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id === id) {
        if (typeof data === 'boolean') {
          return { ...todo, completed: data };
        }

        return { ...todo, title: data };
      }

      return todo;
    }));
  }, [todos]);

  const toggleTodos = () => {
    const activeTodoIds = activeTodos.map((activeTodo: Todo) => activeTodo.id);
    const completedTodoIds = completedTodos.map(
      (completedTodo: Todo) => completedTodo.id,
    );

    setTodos((prevTodos: Todo[]) => prevTodos.map((prevTodo: Todo) => {
      if (activeTodos.length !== 0 && activeTodoIds.includes(prevTodo.id)) {
        return { ...prevTodo, completed: true };
      }

      if (activeTodos.length !== 0 && completedTodoIds.includes(prevTodo.id)) {
        return { ...prevTodo, completed: false };
      }

      return prevTodo;
    }));
  };

  const removeCompletedTodos = () => {
    setTodos(activeTodos);
  };

  const visibleTodos = filterTodos(todos, path);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
          toggleTodos={toggleTodos}
          addTodo={addTodo}
        />
        <TodoList
          todos={visibleTodos}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          setErrorText={setErrorText}
        />
        {!!todos.length && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            removeCompletedTodos={removeCompletedTodos}
          />
        )}
      </div>
      <ErrorNotification
        errorText={errorText}
        setErrorText={setErrorText}
      />
    </div>
  );
};
