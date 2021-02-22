import React, { useState } from 'react';
import { TodoList } from './Components/TodoList/TodoList';
import { TodoFilter } from './Components/TodosFilter/TodosFilter';
import { FILTERS } from './vars';

function App() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim().length > 0) {
      const todo = {
        id: +new Date(),
        title: query,
        completed: false,
      };

      setTodos([todo, ...todos]);
    }

    setQuery('');
  };

  const changeChecked = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    }));
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const filterTodos = (key) => {
    switch (key) {
      case FILTERS.active:
        return activeTodos;

      case FILTERS.completed:
        return completedTodos;

      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos(filter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {
          <TodoList items={filteredTodos} changeChecked={changeChecked} />
        }

        {/* <ul className="todo-list">
          <li>
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
          </li>
        </ul> */}
      </section>

      {
        !!todos.length && (
          <footer className="footer">
            <span className="todo-count">
              {activeTodos.length}
              {' '}
              items left
            </span>

            <TodoFilter changeFilter={setFilter} />

            <button type="button" className="clear-completed">
              Clear completed
            </button>
          </footer>
        )
      }
    </section>
  );
}

export default App;
