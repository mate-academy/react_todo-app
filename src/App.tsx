/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { TodosFilter } from './components/TodosFilter';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosContext } from './context/TodosContext';
// import { TodosProvider } from './context/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      {/* <TodosProvider> */}
      <>
        <TodoApp />
        <TodoList />

        {todos.length > 0 && <TodosFilter />}
      </>
      {/* </TodosProvider> */}
    </div>
  );
};
