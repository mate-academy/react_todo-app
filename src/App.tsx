/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosContext } from './contexts/TodosProvider';
import { TodosFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <>
      <TodoApp />

      {!!todos.length && <TodosFilter />}
    </>
  );
};
