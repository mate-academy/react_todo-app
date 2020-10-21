import React, { useState } from 'react';
import classNames from 'classnames';

function App() {
  const [newTitle, setNewTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const activeTodos = todos.filter(todo => !todo.completed);

  const addTodo = (title) => {
    const todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, todo]);
  };

  const toggleTodo = (todoId) => {
    const callback = (todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    };

    const newTodos = todos.map(callback);

    setTodos(newTodos);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!newTitle) {
      return;
    }

    addTodo(newTitle);
    setNewTitle('');
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={onSubmit}>
          <input
            value={newTitle}
            onChange={({ target }) => {
              setNewTitle(target.value);
            }}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames({
                  completed: todo.completed,
                  editing: false,
                })}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={todo.completed}
                    onChange={() => {
                      toggleTodo(todo.id);
                    }}
                  />
                  <label>{todo.title}</label>
                  <button type="button" className="destroy" />
                </div>
                <input type="text" className="edit" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {activeTodos.length === 1
              ? `1 item left`
              : `${activeTodos.length} items left`
            }
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
      )}
    </section>
  );
}

export default App;
