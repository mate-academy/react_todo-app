import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, changeStatusAll, changeStatus }) => (
  <section className="main">

    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={todos.every(todo => todo.completed)}
      onChange={() => {
        changeStatusAll();
      }}
    />

    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          id={todo.id}
          completed={todo.completed}
          changeStatus={changeStatus}
        />
      ))}

      {/*

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

        */}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  changeStatus: PropTypes.func.isRequired,
  changeStatusAll: PropTypes.func.isRequired,
};
