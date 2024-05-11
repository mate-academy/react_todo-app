/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { GlobalStateProvider } from './store/TodoContext';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <TodoList />
          {/* Hide the footer if there are no todos */}
          <Footer />
        </div>
      </div>
    </GlobalStateProvider>
  );
};
