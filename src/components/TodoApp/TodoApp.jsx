import React, { useState } from 'react';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addTodo(title);
    setTitle('');
  };

  const addTodo = (newtitle) => {
    const newTodo = {
      id: +new Date(),
      title: newtitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  console.log(todos);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleInputChange}
        />
      </form>
      <TodoList
        todos={todos}
      />

      <footer className="footer">
        <span className="todo-count">
          {todos.length} items left
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
    </>
  );
};
