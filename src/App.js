import React, { useState, useEffect } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosFilter } from './components/TodosFilter';
import { getTodos } from './api/api';

function App() {
  const [todos, setTodos] = useState('');

  useEffect(() => {
    updateTodos();
  }, []);

  const updateTodos = () => {
    getTodos()
      .then(response => setTodos(response));
  };

  return (
    <>
      <section className="todoapp">
        <TodoApp todos={todos} setTodos={setTodos} />
        {!!todos.length
        && <TodosFilter todos={todos} updateTodos={updateTodos} />}
      </section>
    </>
  );
}

export default App;
