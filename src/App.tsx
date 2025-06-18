import React from 'react';

import { useTodoContext } from './TodoProvider';

import { AppHeader } from './components/AppHeader';
import { TodoList } from './components/TodoList';
import { AppFooter } from './components/AppFooter';

export const App: React.FC = () => {
  const { hasTodo } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AppHeader />

        <TodoList />

        {hasTodo && <AppFooter />}
      </div>
    </div>
  );
};
