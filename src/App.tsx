/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { AppContext } from './context/AppContext';
import TodoHeader from './components/header/TodoHeader';
import TodoList from './components/todoList/TodoList';
import TodoFooter from './components/footer/TodoFooter';

export const App: React.FC = () => {
  return (
    <AppContext>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <TodoHeader />
          <TodoList />
          <TodoFooter />
        </div>
      </div>
    </AppContext>
  );
};
