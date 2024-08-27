/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useGlobalState } from './CustomHooks/useGlobalState';
import { useDispatch } from './CustomHooks/useDispatch';
import { getTodosFromStorage } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos } = useGlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    const todosFromStorage = getTodosFromStorage();

    if (todosFromStorage.length > 0) {
      dispatch({ type: 'get', payload: todosFromStorage });
    } else {
      const initial: Todo[] = [];

      localStorage.setItem('todos', JSON.stringify(initial));
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main />

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
