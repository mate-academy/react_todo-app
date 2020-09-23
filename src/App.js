import React, { useState, useEffect } from 'react';
import {TodoList } from './components/TodoList/TodoList'



function App() {
  const [todoItems, updateList] = useState([]);
  const [todoValue, todoSetValue] = useState('');

  const handleSet = (todoValue) => {

    return ({
    id: +new Date(),
    title: todoValue.trim(),
    completed: false,
    });
  };

  const itemsLeft = () => {

  return todoItems.filter(item => !item.completed).length;
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if(!todoValue || todoValue.trim() === '' ) {
      todoSetValue('');
      return null;
    }

    updateList([...todoItems, handleSet(todoValue)]);
    todoSetValue('');
  }

useEffect(()=> console.log(todoItems));

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
            value={todoValue}
            onChange={event => todoSetValue(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          itemsList={todoItems}
          updateList={updateList}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {itemsLeft()}
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
