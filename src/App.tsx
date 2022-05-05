import React from 'react';
import { TodosProvider } from './components/TodosContext';
import { TodoApp } from './components/TodoApp';

const App: React.FC = () => {
  return (
    <TodosProvider>
      <section className="todoapp">
        <TodoApp />
      </section>
    </TodosProvider>
  );
};

export default App;
