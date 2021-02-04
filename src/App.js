import React, { useState, useEffect } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [uncompleted, setUncomplited] = useState(0);
  const [checkedAll, setCheckedAll] = useState(false);

  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const toggleAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !checkedAll,
    })));
    setCheckedAll(!checkedAll);
  };

  useEffect(() => {
    const count = todos.filter(todo => !todo.completed);

    setUncomplited(count.length);
  }, [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp newTodo={addTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList items={todos} />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {uncompleted}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
