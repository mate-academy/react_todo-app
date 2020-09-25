import React, { useState, useEffect } from 'react';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';
import { Filter } from '../constants/Filter';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.all);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.completed:
        return todo.completed;

      case Filter.active:
        return !todo.completed;

      default:
        return todo;
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim()) {
      setTodos([
        ...todos,
        {
          title,
          id: +new Date(),
          completed: false,
        },
      ]);
    }

    setTitle('');
  };

  const toggleAll = (event) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    })));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={({ target }) => setTitle(target.value.trimLeft())}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.every(todo => todo.completed)}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            filteredTodos={filteredTodos}
            setTodos={setTodos}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {uncompletedTodos.length === 1
              ? '1 item left'
              : `${uncompletedTodos.length} items left`}
          </span>

          <TodoFilter
            filter={filter}
            setFilter={setFilter}
          />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => setTodos(uncompletedTodos)}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
