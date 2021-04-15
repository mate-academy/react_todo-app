import React from 'react';

export const Footer = ({ todos, setTodos }) => {
  const allTodos = todos;
  const activeTodos = todos.filter(todo => !todo.completed);

  const filterTodos = (event) => {
    const { textContent } = event.target;

    switch (textContent) {
      case 'Active':
        setTodos(activeTodos);
        break;

      case 'All':
      default: {
        setTodos(allTodos);
      }
    }
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTodos.length <= 1 ? (
          `${activeTodos.length} item left`
        ) : (
          `${activeTodos.length} items left`
        )}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={filterTodos}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={filterTodos}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={filterTodos}
          >
            Completed
          </a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
