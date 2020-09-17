import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';

function TodoApp() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [toggleAll, setToggleAll] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  function statusToogler(todoId) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });

    setTodos(updatedTodos);
  }

  useEffect(() => {
    setToggleAll(todos.every(todo => todo.completed));
    setCompletedCount(todos.filter(todo => !todo.completed).length);
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: todoTitle.trim(),
        completed: false,
      },
    ]);
    setTodoTitle('');
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={event => setTodoTitle(event.target.value)}
            value={todoTitle}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={toggleAll}
          onChange={() => {
            setToggleAll(!toggleAll);
            setTodos(todos.map(todo => ({
              ...todo,
              completed: !todo.completed,
            })));
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={todos}
          setTodos={setTodos}
          statusToogler={statusToogler}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {completedCount}
          {' items left'}
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

export default TodoApp;
