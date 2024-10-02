import React from 'react';

import { MyProvider } from './components/state';
import { Footer } from './components/footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/header';

export const App: React.FC = () => {
  return (
    <MyProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <Header />
        <div className="todoapp__content">
          <TodoList />

          <Footer />
        </div>
      </div>
    </MyProvider>
  );
};
