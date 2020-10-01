import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, changeCompleted, markAllCompleted }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={markAllCompleted}
      checked={todos.every(todo => todo.completed)}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      <TodoItem
        todos={todos}
        changeCompleted={changeCompleted}
      />

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" />
          <label>asdfghj</label>
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

    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  markAllCompleted: PropTypes.func.isRequired,
};
