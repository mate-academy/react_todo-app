import React, { useState, useEffect } from 'react';
import {TodoList } from './components/TodoList/TodoList'



function App() {
  const [todoItems, updateList] = useState([]);
  const [todoItem, setItem] = useState('');

  const handleSet = (todoItem) => {

    return ({
    id: +new Date,
    title: todoItem.trim(),
    completed: false,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if(!todoItem || todoItem.trim() === '' ) {
      setItem('');
      return null;
    }

    updateList([...todoItems, handleSet(todoItem)]);
    setItem('');
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => handleSubmit(event)}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoItem}
            onChange={event => setItem(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList itemsList={todoItems} />
      </section>

      <footer className="footer">
        <span className="todo-count">
          3 items left
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
