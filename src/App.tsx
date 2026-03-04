/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { AddBar } from './components/AddBar/AddBar';
import { ErrorNotification } from './components/ErrorMessage/ErrorNotification';
import { useError } from './context/ErrorContext';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { useTodos } from './context/GlobalProvider';

export const App: React.FC = () => {
  const todos = useTodos();
  const { errorMessage, errorVisible, hideError } = useError();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddBar />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>

      <ErrorNotification
        message={errorMessage}
        isVisible={errorVisible}
        onClose={hideError}
      />
    </div>
  );
};
