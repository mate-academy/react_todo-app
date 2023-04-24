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
    const todoToUpdate = todos.find((todo: Todo) => todo.id === id);

    if (typeof data === 'boolean') {
      todoToUpdate.completed = data;
    } else {
      todoToUpdate.title = data;
    }

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
    const activeIds = activeTodos.map((activeTodo: Todo) => activeTodo.id);
    const completedIds = completedTodos.map(
      (completedTodo: Todo) => completedTodo.id,
    );

    let updatedTodos;

    if (activeTodos.length !== 0) {
      updatedTodos = todos.map((todo: Todo) => (
        activeIds.includes(todo.id) ? { ...todo, completed: true } : todo
      ));
    } else {
      updatedTodos = todos.map((todo: Todo) => (
        completedIds.includes(todo.id)
          ? { ...todo, completed: false } : todo
      ));
    }

    setTodos(updatedTodos);
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
