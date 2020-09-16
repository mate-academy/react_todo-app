import React, { useState, useEffect } from 'react';
import { TodoList } from '../TodoList';

export const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [toggleAll, setToggleAll] = useState(false);

  const completedTodos = todos.filter(todo => todo.completed === false);

  useEffect(() => setToggleAll(todos.every(todo => todo.completed)), [todos]);

  const handleTodoAddition = (title) => {
    if (title) {
      setTodos([...todos, {
        id: +new Date(),
        title,
        completed: false,
      }]);
    }

    setInputValue('');
  };

  const handleToggleTodosStatus = () => {
    setToggleAll(!toggleAll);

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    })));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTodoAddition(inputValue);
          }}
        >
          <input
            value={inputValue}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={e => setInputValue(e.target.value.trimLeft())}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            checked={toggleAll}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={() => {
              handleToggleTodosStatus();
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            setToggleAll={setToggleAll}
            toggleAll={toggleAll}
            setTodos={setTodos}
            todos={todos}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {completedTodos.length === 1 && (
              `${completedTodos.length} item left`
            )}

            {completedTodos.length !== 1 && (
              `${completedTodos.length} items left`
            )}
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
};
