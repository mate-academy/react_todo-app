import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { Form } from './components/Form';

function App() {
  // eslint-disable-next-line no-undef
  const [initialTodoList, setInitialTodoList] = useLocalStorage('todos', []);
  // eslint-disable-next-line no-undef
  const [setTodoList] = useLocalStorage('todos', []);
  const [setLeftTodo] = useState(0);
  const [filterClass] = useState('all');
  const [setMarkAll] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleChecked = (id, isCompleted) => {
    const changedInitialTodos = initialTodoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: isCompleted,
        };
      }

      return { ...todo };
    });

    const leftActiveTodos = changedInitialTodos.filter(
      todo => todo.completed === false,
    ).length;

    setInitialTodoList(changedInitialTodos);
    setLeftTodo(leftActiveTodos);

    if (filterClass === 'all') {
      setTodoList(changedInitialTodos);
    } else {
      const filter = filterClass === 'completed';
      const filteredList = changedInitialTodos.filter(
        todo => todo.completed === filter,
      );

      setTodoList(filteredList);
    }

    const markedAll = changedInitialTodos.every(
      todo => todo.completed === true,
    );

    setMarkAll(markedAll);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
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
