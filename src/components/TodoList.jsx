import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { TodoItem } from './TodoItem';
import { FILTERS, INVALID_TODO_ID } from '../constants';

export function TodoList({ todos, isToggleAllChecked, handleToggleAll }) {
  const { pathname } = useLocation();
  const [currentEditedItem, setCurrentEditedItem] = useState(INVALID_TODO_ID);

  const filteredTodos = useMemo(
    () => (
      todos.filter(({ completed }) => {
        switch (pathname) {
          case FILTERS.active:
            return !completed;

          case FILTERS.completed:
            return completed;

          case FILTERS.all:
          default:
            return true;
        }
      })
    )
    , [todos, pathname],
  );

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={isToggleAllChecked}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
        </>
      )}

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={cn({
              completed: todo.completed,
              editing: currentEditedItem === todo.id,
            })}
          >
            <TodoItem
              {...todo}
              editing={currentEditedItem === todo.id}
              onEdit={setCurrentEditedItem}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  isToggleAllChecked: PropTypes.bool,
  handleToggleAll: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  isToggleAllChecked: false,
};
