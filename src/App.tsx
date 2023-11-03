import React, { useContext } from 'react';
import { TodosContext, TodosProvider } from './components/TodosContext';
import { TodoApp } from './components/TodoApp';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  // eslint-disable-next-line no-console
  console.log(todos);

  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
        {todos.length === 0 && (
          <Main />
        )}
        <Footer />
      </TodosProvider>
    </div>
  );
};
