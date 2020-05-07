import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onComplete }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={onComplete}
          />
          <label htmlFor="todo-1">{todo.title}</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    ))
    }
    {/* <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-1" />
          <label htmlFor="todo-1">asdfghj</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-2" />
          <label htmlFor="todo-2">qwertyuio</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-3" />
          <label htmlFor="todo-3">zxcvbnm</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-4" />
          <label htmlFor="todo-4">1234567890</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li> */}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.objectOf().isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default TodoList;
