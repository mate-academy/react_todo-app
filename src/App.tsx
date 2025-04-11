/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoHeader } from './component/TodoHeader';
import { TodoList } from './component/TodoList';
import { TodoFooter } from './component/TodoFooter';
import { TodoContex } from './component/Contex';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContex);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
