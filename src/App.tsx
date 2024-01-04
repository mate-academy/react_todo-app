/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './todoList/todoList';
import { Todo } from './types/todoType';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [itemLeft, setItemLeft] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title) {
      setItemLeft(itemLeft + 1);
      const id = (+new Date());

      const newTodo: Todo = {
        id,
        title,
        completed: false,
      };

      addTodo(newTodo);
      setTitle('');
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleInput}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"

        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList items={todos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {itemLeft}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({
                selected: selectedFilter === 'All',
              })}
              onClick={() => {
                setSelectedFilter('All');
              }}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={classNames({
                selected: selectedFilter === 'Active',
              })}
              onClick={() => {
                setSelectedFilter('Active');
              }}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={classNames({
                selected: selectedFilter === 'Completed',
              })}
              onClick={() => {
                setSelectedFilter('Completed');
              }}
            >
              Completed
            </a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
