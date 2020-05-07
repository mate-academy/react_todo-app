import React from 'react';
import { Title } from './components/Title';
import { ToDoContainer } from './containers/ToDoContainer';

function App() {
  return (
    <section className="todoapp">
      <Title title="Todo App" />
      <ToDoContainer />
    </section>
  );
}

export default App;
