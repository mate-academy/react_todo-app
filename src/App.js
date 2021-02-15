import React, { useState, useEffect } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [isAllTrue, setIsAllTrue] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {

  }, [todos]);

  const handleSubmit = (todoText) => {
    setTodos([
      ...todos,
      { completed: false, id: +new Date(), title: todoText },
    ]);
  };

  const handleToggleAll = () => {
    if (isAllTrue) {
      setTodos([...todos].map(todo => (
        { ...todo, completed: false }
      )));
      setIsAllTrue(false);
    } else {
      setTodos([...todos].map(todo => (
        { ...todo, completed: true }
      )));
      setIsAllTrue(true);
    }
  };

  const handleToggle = (id) => {
    setTodos([...todos].map(
      todo => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const handleDelete = (title) => {
    setTodos([...todos].filter(todo => todo.title !== title));
  };

  const handleClear = () => {
    setTodos([...todos].filter(todo => !todo.completed));
  };

  const handleShowAll = () => {
    setIsFiltered(false);
  };

  const handleShowCompleted = () => {
    setIsFiltered(true);
    setFilteredTodos([...todos].filter(todo => todo.completed));
  };

  const handleShowActive = () => {
    setIsFiltered(true);
    setFilteredTodos([...todos].filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoApp onSubmit={handleSubmit} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={isFiltered
            ? filteredTodos
            : todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

      </section>

      <footer className="footer">
        <span className="todo-count">
          {[...todos].filter(todo => !todo.completed).length}
          {' '}
          items left
        </span>

        <TodosFilter
          handleShowAll={handleShowAll}
          handleShowCompleted={handleShowCompleted}
          handleShowActive={handleShowActive}
        />

        {/* <ul className="filters">
          <li>
            <a href="#/" className="selected" onClick={handleShowAll}>All</a>
          </li>

          <li>
            <a href="#/active" onClick={handleShowActive}>Active</a>
          </li>

          <li>
            <a href="#/completed" onClick={handleShowCompleted}>Completed</a>
          </li>
        </ul> */}

        <button type="button" className="clear-completed" onClick={handleClear}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
