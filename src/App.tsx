/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { TodoApp } from './components/TodoApp';
import { StateContext } from './services/TodosContext';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <TodoApp />

      {!!todos.length && (
        <>
          <TodoList />
          <TodoFilter />
        </>
      )}
    </div>
  );
};
