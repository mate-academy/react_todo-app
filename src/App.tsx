/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';

const App: React.FC = () => (
  <section className="todoapp">
    <TodoApp />
  </section>
);

export default App;
