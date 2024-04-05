/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import './styles/index.scss';
import { Header } from './components/Header/Header';
import { TodoProvider } from './contexts/TodoContext';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { getTodosFromLocalStorage } from './utils/getTodosFromLocalStorage';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState(getTodosFromLocalStorage());

  useEffect(() => {
    window.addEventListener(
      'storage',
      () => {
        console.log('storage');
        setTodoList([...getTodosFromLocalStorage()]);
      },
      false,
    );
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoProvider>
        <div className="todoapp__content">
          <Header />
          <TodoList />

          {/* Hide the footer if there are no todos */}
          {todoList.length !== 0 ? <Footer /> : null}
        </div>
      </TodoProvider>
    </div>
  );
};
