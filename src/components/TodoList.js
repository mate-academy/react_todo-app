import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, toggleComplete }) => (

  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          {...todo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
