/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { useLocalStorage } from './utils/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoTitle, setTodoTitle] = useState('');

  const [completedTodo, uncompletedTodo] = todos.reduce(
    (acc: Todo[][], todo: Todo) => {
      if (todo.completed) {
        acc[0].push(todo);
      } else {
        acc[1].push(todo);
      }

      return acc;
    },
    [[], []],
  );

  const handleAddTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim().length) {
      return;
    }

    const newTodo: Todo = {
      title: todoTitle,
      id: +new Date(),
      completed: false,
    };

    handleAddTodo(newTodo);
    setTodoTitle('');
  };

  const handleToggleCompleted = (todoId: number) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    }));
  };

  const handleToggleAllTodosCompleted = () => {
    setTodos(prevTodos => prevTodos.map((todo: Todo) => (
      { ...todo, completed: true }
    )));
  };

  const handleRemoveTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter((todo: Todo) => todo.id !== todoId));
  };

  const handleClearAllCompletedTodos = () => {
    setTodos(prevTodos => prevTodos.filter((todo: Todo) => !todo.completed));
  };

  const handleChangeTitle = (todoId: number, newTitle: string) => {
    setTodos(prevTodos => prevTodos.map((todo: Todo) => (todo.id === todoId
      ? { ...todo, title: newTitle }
      : todo)));
  };

  const { pathname } = useLocation();

  const visibleTodos = useMemo(() => {
    switch (pathname) {
      case Status.ACTIVE:
        return uncompletedTodo;

      case Status.COMPLETED:
        return completedTodo;

      case Status.ALL:
      default:
        return todos;
    }
  }, [todos, pathname]);

  return (
    <div className="todoapp">
      <Header
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
        handleSubmit={handleSubmit}
      />

      {todos.length !== 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={handleToggleAllTodosCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={visibleTodos}
            handleToggleCompleted={handleToggleCompleted}
            handleRemoveTodo={handleRemoveTodo}
            handleChangeTitle={handleChangeTitle}
          />
        </section>
      )}

      {todos.length !== 0 && (
        <Footer
          uncompletedTodo={uncompletedTodo}
          completedTodo={completedTodo}
          handleClearAllCompletedTodos={handleClearAllCompletedTodos}
        />
      )}
    </div>
  );
};
