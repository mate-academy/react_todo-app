import React, { useState } from 'react';

import { Todo } from './components/Todo';

const todos = [
  {
    id: 1,
    title: 'Cross from lake to forest!',
    completed: false,
  },
  {
    id: 2,
    title: 'Cross from city to vilage!',
    completed: false,
  },
  {
    id: 3,
    title: 'Cross from sea to hotel!',
    completed: false,
  },
];

function App() {
  const [todoList, setTodoList] = useState(todos);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);

    // eslint-disable-next-line
    console.log('tjsiijisjisijs');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = new Date().toDateString();
    const newTodo = {
      id: time,
      title: event.target.value,
      completed: false,
    };

    setTodoList((prevState) => {
      return {
        ...prevState,
        newTodo,
      };
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        {/* <label htmlFor="toggle-all">Mark all as complete</label> */}

        <ul className="todo-list">
          {todoList.map(todo => {
            return (
              <li
                className="list-item"
                key={todo.id}
              >
                <Todo
                  todo={todo}
                />
              </li>
            );
          })}

          {/* <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>asdfghj</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="completed">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>qwertyuio</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>zxcvbnm</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>1234567890</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li> */}
        </ul>
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
