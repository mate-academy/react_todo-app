/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { ErrorInfo } from './components/ErrorInfo';
import { Footer } from './components/Footer';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const { todos, filter, getFilteredTodos } = useTodos();
  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify([]));
  }, []);
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && <Footer />}
      </div>

      <ErrorInfo />
    </div>
  );
};
