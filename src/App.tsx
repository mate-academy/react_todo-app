import React, { useContext } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosContext } from './store';
import { TodosFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <TodoApp />
      {!!todos.length && <TodosFilter />}
    </div>
  );
};
