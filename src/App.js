import React, { useState, useEffect } from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
// import { TodoItem } from './components/TodoItem/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState();

  useEffect(() => {
    if (todo) {
      setTodos([...todos, todo]);
    }
  }, [todo, setTodos]);

  const handleDelete = (id) => {
    // console.log(id);
    const newTodos = todos.filter(item => item[1] !== id);

    setTodos(newTodos);
  };

  return (
    <section className="todoapp">
      <TodoApp onAdd={setTodo} />

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={todos} onDelete={handleDelete} />
      </section>

      <TodosFilter />
    </section>
  );
}

export default App;
