import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos, toggleStatusItem }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleStatusItem={toggleStatusItem}
      />
    ))}

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
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  toggleStatusItem: PropTypes.func.isRequired,
};
