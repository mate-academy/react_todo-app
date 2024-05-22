import React from 'react';
import { TodoHeader } from './TodoHeader';
import { TodoMain } from './TodoMain';
import { TodoFooter } from './TodoFooter';

export const TodoApp: React.FC = () => (
  <div className="todoapp">
    <h1 className="todoapp__title">todos</h1>
    <div className="todoapp__content">
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </div>
  </div>
);
