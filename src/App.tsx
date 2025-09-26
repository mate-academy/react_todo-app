import React, { useContext } from 'react';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoContext } from './utils/context';
import type { TodoContextType } from './types/types';

export const App: React.FC = () => {
  const { todos } = useContext<TodoContextType>(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
