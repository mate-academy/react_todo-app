import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { removeTodo } from '../api/api';

export const TodosFilter = ({ todos, updateTodos }) => {
  const [itemsLeft, setItemsLeft] = useState('');

  useEffect(() => {
    if (todos) {
      setItemsLeft(todos.reduce((acc, currentValue) => {
        if (!currentValue.completed) {
          return acc + 1;
        }

        return acc;
      }, 0));
    }
  }, [todos]);

  const clearCompleted = async() => {
    await Promise.all(todos.map((todo) => {
      if (todo.completed) {
        return removeTodo(todo.id);
      }

      return todo;
    }));

    updateTodos();
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${itemsLeft}  `}
        items left
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            exact
            activeClassName="selected"
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink to="/active" activeClassName="selected">
            Active
          </NavLink>
        </li>

        <li>
          <NavLink to="/completed" activeClassName="selected">
            Completed
          </NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
