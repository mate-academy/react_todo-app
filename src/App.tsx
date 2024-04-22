/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Footer, Header, TodoList } from './components';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />
        
        <Footer />
      </div>
    </div>
  );
};
