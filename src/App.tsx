import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';

const App: React.FC = () => {
  return (
    <section className="todoapp">
      <TodoApp />
    </section>
  );
};

export default App;
