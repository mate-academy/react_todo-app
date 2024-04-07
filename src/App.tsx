/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import './styles/index.scss';
import { Header } from './components/Header/Header';
import { TodoProvider } from './contexts/TodoContext';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => (
  <div className="todoapp">
    <h1 className="todoapp__title">todos</h1>

    <TodoProvider>
      <div className="todoapp__content">
        <Header />
        <TodoList />
      </div>
    </TodoProvider>
  </div>
);
