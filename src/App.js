import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { todos as todosFromServer } from './api/api';

import { TodoApp } from './components/TodoApp/TodoApp';

function App() {
  return (
    <section className="todoapp">
      <BrowserRouter>
        <TodoApp todos={todosFromServer} />
      </BrowserRouter>
    </section>
  );
}

export default App;
