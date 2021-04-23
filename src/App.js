import React, { useState, useEffect } from 'react';
import { TodoApp } from './styles/components/TodoApp/TodoApp';
import { TodoList } from './styles/components/TodoList/TodoList';
import { TodosFilter } from './styles/components/TodosFilter/TodosFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    setTodos([...todos, todo]);
    /* console.log(todo, 'it`s todo');
    console.log(todos, 'it`s todos'); */
  }, [todo, setTodos]);

  return (
    <section className="todoapp">
      <TodoApp onAdd={setTodo} />

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={todos} />
      </section>

      <TodosFilter />
    </section>
  );
}

export default App;
