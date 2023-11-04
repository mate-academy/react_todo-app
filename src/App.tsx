import React, { useContext } from 'react';
import { TodosContext, TodosProvider } from './components/TodosContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  // eslint-disable-next-line no-console
  console.log(todos);

  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </div>
  );
};
